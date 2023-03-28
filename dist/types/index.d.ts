import { types } from '@clearblade/ia-mfe';
export type EventBackendWithRuleLabel = types.Event['backend'] & {
    rule_label: string;
};
