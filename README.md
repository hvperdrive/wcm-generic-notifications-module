# @wcm/generic-notifications

This module listens for internal events and sends the events elsewhere using others modules mappers and emitters or by using its default mapper and emitter. The events to listen for are configurable using an interface.

## Prerequisites
 - A running implementation of the Pelorus CMS in multitenancy mode is needed either locally or on a server.
 (see https://github.com/hvperdrive/pelorus-cms and https://github.com/hvperdrive/pelorus-multitenancy)
 - Node needs to be installed on the system.
 (see https://nodejs.org)

## How to install
1. Publish the latest version to the nexus repo if necessary
2. Define the module and version in Pelorus multitenancy instance
3. Add module to the Pelorus CMS tenant/instance in peloruse multitenancy instance

## Usage

The user can configure which events to listen to and where to send them using the notification menu item.
You can configure it like so:

1. Fill in an administration name
2. Select a source type (eg. Content, View, Menu, ...)
3. Configure source specific filters (for now only content ContentType filter is supported)
4. Select an event to listen for (eg. Created, Updated, ...)
5. Select a mapper to use (optional). The default while send the complete entity.
6. Select a emitter to use (optional). The default will use the module configuration.
7. Give a topic (or name) to the specific event. This can be used in the emitter and/or mapper.


### API
You can find the API reference in the swagger/output folder as a swagger definition.
You can beautify the output by copying the content into a swagger editor (eg. http://editor.swagger.io/#/).

### Implementation

The module exposes the following methods:
- registerMapper
    - name: String,
    - fn: Function(
        eventName: String,
        configuredEvent: Object,
        data: Any
    )
- registerEmitter
    - name: String,
    - fn: Function(
        eventName: String,
        configuredEvent: Object,
        data: Any
    )
- unregisterMapper
    - name: String
- unregisterEmitter
    - name: String

#### Example usage

```javascript
const request = require("request");
const ModuleHelper = require("@wcm/module-helper");

ModuleHelper.getModule("@wcm/generic-notifications")
    .then((notificationModule) => {
        // This is an example mapper that just returns the data as is. (same as default mapper)
        notificationAPI.registerMapper(
            "someName", 
            (eventName, configuredEvent, data) => data; 
        );

        // This is an example emitter that sends the event to a service using request library.
        // Notice the type query parameter that is being sent. The topic of the configuredEvent can be used as scope or namespace.
        notificationAPI.registerEmitter(
            "someName",
            (eventName, configuredEvent, data) => request({
                url: "someUrl",
                qs: {
                    type: configuredEvent.topic
                },
                method: "POST"
            }, (err, response, body) => err ? console.log("oh oooh...", err) : console.log(body))
        )
    });
```

### Important notes

- Don't forget to listen for WCM internal module events to know when the generic notification module is installed.

## Module development

Please read the following on how to work with WCM modules before changing anything to this repo.

[Modules manual on Github](https://github.com/hvperdrive/pelorus-cms/blob/develop/readmes/modules.md) <br>
[Modules manual on Digipolis Bitbucket](https://bitbucket.antwerpen.be/projects/WCM/repos/wcm/browse/readmes/modules.md)
