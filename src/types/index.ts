import { Event } from '@clearblade/ia-mfe-core';

export type EventBackendWithRuleLabel = Event['backend'] & {
  rule_label: string;
};
