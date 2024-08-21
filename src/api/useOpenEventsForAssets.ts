import { useQuery, useQueryClient } from "react-query";
import { getAuthInfo } from "../utils/authInfo";
import { getPlatformInfo } from "../utils/platformInfo";
import { EventBackendWithRuleLabel } from "../types";
import { tryParse } from "@clearblade/ia-mfe-core";
import { useMessaging } from "@clearblade/ia-mfe-react";
import { useEffect } from "react";
import { Event } from "@clearblade/ia-mfe-core";

const eventsQueryKeys = {
  all: [{ scope: "seawolf-open-events-for-assets" }],
};

const topics = [
  "_dbupdate/_monitor/_events",
  "_dbupdate/_monitor/_events/_platform",
];
const callbackId = "seawolf-open-events-for-assets";

interface EventMessagePayload {
  event: Event["backend"];
  rule_label: string;
  isNewEvent: boolean;
}

interface EventSubscriptionResponse {
  payload: EventMessagePayload;
}

export function useOpenEventsForAssets() {
  const { status, subscribe, unsubscribe } = useMessaging();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (status.messaging) {
      subscribe<EventMessagePayload>(
        topics,
        (message) => {
          queryClient.setQueryData<EventBackendWithRuleLabel[]>(
            eventsQueryKeys.all,
            (data) => {
              return updateLiveOpenEvents(data, message);
            }
          );
        },
        callbackId
      );
    }

    return () => {
      if (status.messaging) {
        unsubscribe(topics, callbackId);
      }
    };
  }, [subscribe, unsubscribe, status.messaging]);

  return useQuery({
    queryKey: eventsQueryKeys.all,
    refetchOnWindowFocus: false,
    queryFn: async (): Promise<EventBackendWithRuleLabel[]> => {
      const authInfo = getAuthInfo();
      const resp = await fetch(
        `${getPlatformInfo().url}/api/v/1/code/${
          authInfo.systemKey
        }/fetchTableItems?id=openEventsForAssets.read`,
        {
          method: "POST",
          headers: {
            "ClearBlade-UserToken": authInfo.userToken,
          },
          body: JSON.stringify({
            name: "openEventsForAssets.read",
            body: {},
          }),
        }
      );

      if (!resp.ok) {
        const errText = await resp.text();
        throw errText;
      }

      const data = (await resp.json()) as {
        results: { DATA: EventBackendWithRuleLabel[] };
      };

      return data.results.DATA;
    },
    select: (data): Record<string, EventBackendWithRuleLabel[]> => {
      const rtn = data.reduce((acc, event) => {
        const eventAssets = tryParse(event.assets, {});
        Object.keys(eventAssets).forEach((assetId) => {
          acc[assetId] !== undefined
            ? acc[assetId].push(event)
            : (acc[assetId] = [event]);
        });
        return acc;
      }, {});
      return rtn;
    },
  });
}

function updateLiveOpenEvents(
  data: EventBackendWithRuleLabel[],
  message: EventSubscriptionResponse
): EventBackendWithRuleLabel[] {
  const { event, rule_label } = message.payload;
  const eventIndex = data.findIndex((e) => e.id === event.id);
  if (event.is_open === false && eventIndex >= 0) {
    // remove the event from the list
    return data.filter((_e, i) => {
      return i !== eventIndex;
    });
  } else if (event.is_open === true && eventIndex === -1) {
    // add the event to the beginning of the list
    return [{ ...event, rule_label }, ...data];
  }

  return data;
}
