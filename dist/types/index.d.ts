import { Event } from '@clearblade/ia-mfe-core';
export declare type EventBackendWithRuleLabel = Event['backend'] & {
    rule_label: string;
};
