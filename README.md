# kaholo-plugin-zabbix
Kaholo integration with Zabbix API

## Settings:
1. Host URL (String) **Optional** - The full URL to your Zabbix default server.
2. Username (String) **Optional** - The username of the default user to authenticate with.
3. Password (Vault) **Optional** - The password of the default user to authenticate with.

* **Notice!** Possible Severity values:
0 - not classified; 
1 - information; 
2 - warning; 
3 - average; 
4 - high; 
5 - disaster.

## Method: Get Events
This method returns data about the events specified.

### Parameters:
1. Host URL (String) **Optional** - The full URL to the Zabbix server you want to get events from.
2. Username (String) **Optional** - The username of the default user to authenticate with.
3. Password (Vault) **Optional** - The password of the default user to authenticate with.
4. Events IDs (Text/Array) **Optional** - If specified then get info only about events with matching Event ID.
5. Group IDs (Text/Array) **Optional** - If specified then get info only about events with matching Group ID.
6. Severities (Text/Array) **Optional** - If specified then get info only about events with matching severity. All severities must be integers.
7. Tags (Text/Array) **Optional** - If specified then get info only about events with matching tags.
8. Tag Eval Type (Options) **Optional** - Onlt matters if tags were specified. Whether to return only events with all tags specified(AND), or with some of the tags(OR). default value is AND.
9. Acknowledged (Options) **Optional** - Whether to return acknowledged/un-acknowkedged/both.
10. Suppressed (Boolean) **Optional** - If specified only return suppressed events.

## Method: Acknowledge Events
This method acknowledeges/un-acknowledeges the specified events. Can also close events or change their severities using this event.

### Parameters:
1. Host URL (String) **Optional** - The full URL to the Zabbix server you want to get events from.
2. Username (String) **Optional** - The username of the default user to authenticate with.
3. Password (Vault) **Optional** - The password of the default user to authenticate with.
4. Events IDs (Text/Array) **Required** - The IDs of the events to acknowledge.
5. Acknowledge Type (Options) **Optional** - The type of acknowledge to send. the options are: Acknowledge/Un-acknowledge/None. Default value is Acknowledge.
6. Close (Boolean) **Optional** - Whether to close the event or not. Default value is false. 
7. Message (Text) **Optional** - Message to attach to the acknowledgement details in the event.
8. Severity (Integer) **Optional** - If specified, change the seveirity of the event to the value specified.

## Method: Get Problems
This method returns data about the problems specified.

### Parameters:
1. Host URL (String) **Optional** - The full URL to the Zabbix server you want to get events from.
2. Username (String) **Optional** - The username of the default user to authenticate with.
3. Password (Vault) **Optional** - The password of the default user to authenticate with.
4. Events IDs (Text/Array) **Optional** - If specified then get info only about problems with matching Event ID.
5. Group IDs (Text/Array) **Optional** - If specified then get info only about problems with matching Group ID.
6. Severities (Text/Array) **Optional** - If specified then get info only about problems with matching severity. All severities must be integers.
7. Tags (Text/Array) **Optional** - If specified then get info only about problems with matching tags.
8. Tag Eval Type (Options) **Optional** - Onlt matters if tags were specified. Whether to return only problems with all tags specified(AND), or with some of the tags(OR). default value is AND.
9. Acknowledged (Options) **Optional** - Whether to return acknowledged/un-acknowkedged/both.
10. Suppressed (Boolean) **Optional** - If specified only return suppressed problems.
