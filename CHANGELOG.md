# Release 3.10.0-alpha.2

### Bugs fixed
* None

### Enhancements
* None


# Release 3.10.0-alpha.1

### Bugs fixed
* None

### Enhancements
* None


# Release 3.10.0-alpha

### Bugs fixed
* None

### Enhancements
* Uses sync 3.9.1, which introduces mulithreaded networking


# Release 3.9.13

### Bugs fixed
* None

### Enhancements
* Added `enableDebugMode` option to KubernetesSyncWorker


# Release 3.9.12

### Bugs fixed
* None

### Enhancements
* Added `startedAt` property to KubernetesSyncWorker


# Release 3.9.12-debug

### Bugs fixed
* None

### Enhancements
* None


# Release 3.9.12-alpha.1

### Bugs fixed
* None

### Enhancements
* Improved logging around fatal sync worker errors.


# Release 3.9.11

### Bugs fixed
* [Sync] Fixed a bug with with the server bootup consistency checker.

### Enhancements
* None


# Release 3.9.10

### Bugs fixed
* Fixed a failure in the `PrometheusStatsStorage` where url creation threw an error when running on Node.js v6.

### Enhancements
* The server can now be started with a `StatsdStatsSink` as `StatsSink`.
  When doing this any statistics captured by the server and its sync workers will be send as UDP packets to a predefined
  UDP socket. This enables a better integration into environments where statistics are aggregated via StatsD.
* [Sync] Added more logging around the detection of invalid partial realms about to be renamed as "inconsistent". The error causing the inconsistency was previously swallowed.
* [Sync] Fixed a bug which could result in memory corruption and crashes.


# Release 3.9.10-alpha.1

### Bugs fixed
* Fixed a failure in the `PrometheusStatsStorage` where url creation threw an error when running on Node.js v6.

### Enhancements
* The server can now be started with a `StatsdStatsSink` as `StatsSink`.
  When doing this any statistics captured by the server and its sync workers will be send as UDP packets to a predefined
  UDP socket. This enables a better integration into environments where statistics are aggregated via StatsD.
* [Sync] Added more logging around the detection of invalid partial realms about to be renamed as "inconsistent". The error causing the inconsistency was previously swallowed.


# Release 3.9.9

### Bugs fixed
* None

### Enhancements
* None


# Release 3.9.8

### Bugs fixed
* The StandaloneStats (used when running ROS in the single-process mode) was not checking label names correctly.
* ROS would crash if receiving a stat with an unexpected "path" label for the newly added realm_state_size metric.

### Enhancements
* None


# Release 3.9.7

### Bugs fixed
* None

### Enhancements
* None


# Release 3.9.6

### Bugs fixed
* None

### Enhancements
* None


# Release 3.9.5

### Bugs fixed
* Updated to Sync 3.8.5
  * Fixed a bug that would result in the server crashing with `std::bad_alloc` in the error message.

### Enhancements
* None


# Release 3.9.4

### Bugs fixed
* None

### Enhancements
* ROS can now be started with an option (--realm-size-reporting when started on the CLI and `enableRealmSizeReporting`
  when starting the server programatically) to periodically (currently every 30 minutes) emit stats about the size of
  the data of realms stored on the server. These can be read by admin users via a new `/stats/{metricName}` HTTP
  endpoint.
* Update to Sync 3.8.4.
  * Improved the average memory usage during merge.
  * Fixed another memory bug related to stray iterators while iterating in the merge algorithm, which could lead to memory corruption, changeset corruption, and crash the server/client.
  * Optimized ChangesetIndex when merging changesets that mention a large number of objects.


# Release 3.9.3

### Bugs fixed
* ROS will no longer initialize new projects with the latest version of ROS by default.
Instead, it will use the version of the globally installed package. If you want to initialize
a project with the latest version of ROS, you can use `ros init my-project --latest`.

### Enhancements
* Allow `ros init` to be run without an argument from an empty folder. In this case, it will
initialize the project in the current folder.


# Release 3.6.5-2

### Bugs fixed
* None

### Enhancements
* None


# Release 3.9.2

### Bugs fixed
* None

### Enhancements
* Added two parameters - `shouldCompactRealmsAtStart` and `shouldPerformPartialSyncAtStart`
  that control whether the server will compact the Realms and do a complete partial sync
  during initialization. Compacting the Realms may reduce the disk space they use, while
  performing partial sync will detect inconsistencies in the partial Realms and correct them
  at the cost of incurring a client reset for the clients that used to synchronize against
  an inconsistent Realm. It is recommended that they are set to `false` (or left undefined)
  unless you are experiencing Bad Changeset errors or excessive disk usage.


# Release 3.6.5-1

### Bugs fixed
* `RealmDirectoryService` will initialize the Default Realm only once. This prevents extensively long ROS startup times
when the default Realm contains a lot of data.

### Enhancements
* None


# Release 3.9.1

### Bugs fixed
* None

### Enhancements
* None


# Release 3.9.0

### Enhancements
* Added an optional `allowAnonymous` argument to route decorators. If not specified on the route level,
  the service-level value will be used. To specify it for individual route, use the following syntax:

  ```ts
  @Get("/some-path", /* allowAnonymous */ true)
  public unauthorizedFunction() {}
  ```

  The route-level value, if specified, will override the service-level value. To specify it at the service level,
  use the following syntax:

  ```ts
  @BaseRoute("/my-service", /* allowAnonymous */ false)
  export class MyUnauthorizedService {}
  ```

  The default value for the service decorator is `true`, meaning ROS will not enforce authorization requirements by
  default.


# Release 3.8.5

### Bugs fixed
* None

### Enhancements
* None


# Release 3.8.4

### Bugs fixed
* None

### Enhancements
* None


# Release 3.8.3

### Bugs fixed
* None

### Enhancements
* None


# Release 3.8.2

### Bugs fixed
* None

### Enhancements
* Added an optional `allowAnonymous` argument to route decorators. If not specified on the route level,
  the service-level value will be used. To specify it for individual route, use the following syntax:

  ```ts
  @Get("/some-path", /* allowAnonymous */ true)
  public unauthorizedFunction() {}
  ```

  The route-level value, if specified, will override the service-level value. To specify it at the service level,
  use the following syntax:

  ```ts
  @BaseRoute("/my-service", /* allowAnonymous */ false)
  export class MyUnauthorizedService {}
  ```

  The default value for the service decorator is `true`, meaning ROS will not enforce authorization requirements by
  default.


# Release 3.8.1

### Bugs fixed
* The PermissionsService will wait for the wildcard permissions Realms to be created.

### Enhancements
* Exclude internal traffic (e.g. ROS-to-ROS or health checks on Cloud) from traffic metrics.


# Release 3.8.0

### Bugs fixed
* None

### Enhancements
* None


# Release 3.6.12

### Bugs fixed
* Fixed a bug that could result in a crash with the message "bad changeset error".

### Enhancements
* None


# Release 3.6.11

### Bugs fixed
* Fixes an unhandled promise rejection in kubernetes/ResourceWatcher
* Adds delay to reconnection attempts in kubernetes/ResourceWatcher

### Enhancements
* None


# Release 3.6.10

### Bugs fixed
* The server will now proactively crash on client reset rather than go into a non-deterministic state.

### Enhancements
* None


# Release 3.6.9

### Bugs fixed
* Fix `404 Not Found: realm-sync-server` errors when installing.

### Enhancements
* None


# Release 3.6.8

### Bugs fixed
* Not supplying `baseUrl` in the `BasicEmailHandlerConfig` will no longer result in an exception being thrown.
* Fixed a problem which would sometimes cause `bad permission object` and `bad changeset errors`.

### Enhancements
* None


# Release 3.6.7

### Bugs fixed
* Fixed an issue that would cause the `@Next` annotation to pass in an invalid argument.

### Enhancements
* None


# Release 3.6.6

### Bugs fixed
* None

### Enhancements
* Exposed history log compaction configuration options. The BasicServer config object now has `historyTtl`
property to configure the time after which history entries will expire and be eligible for compaction (default
is infinite). The `SyncService` configuration object has that as well as `historyCompactionInterval` (to control
at what intervals the compaction algorithm will be run, default 3600) and `enableLogCompaction` (to disable the
algorithm altogether, default is enabled).


# Release 3.6.5

### Bugs fixed
* `RealmDirectoryService` will initialize the Default Realm only once. This prevents extensively long ROS startup times
when the default Realm contains a lot of data.

### Enhancements
* None


# Release 3.6.4

### Bugs fixed
* KubernetesSyncWorker: add delay between endpoints updates to work around an issue in kube-router

### Enhancements
* None


# Release 3.6.3

### Bugs fixed
* None

### Enhancements
* None


# Release 3.6.2

### Bugs fixed
* None

### Enhancements
* None


# Release 3.6.1

### Bugs fixed
* None

### Enhancements
* None


# Release 3.6.0

### Bugs fixed
* Don't keep the default Realm open for the duration of running the server.

### Enhancements
* The SyncService will always emit sync worker stats to the server's stats sink now.
* Expose `PrometheusStatsSink` on the `stats` export for easier importing.
* If `BasicServer` doesn't finish starting in a set time crash the process.


# Release 3.5.2

### Bugs fixed
* Fixes an error being reported about WildcardPermissionsRealm missing on bootup.
* Fixes an issue that could make the server unresponsive after deleting Realms or users.

### Enhancements
* Added option for enableDownloadLogCompaction in KubernetesSyncWorker


# Release 3.5.1

### Bugs fixed
* Exposed API for setting the feature token.

### Enhancements
* None


# Release 3.5.0

### Bugs fixed
* None

### Enhancements
* The developer edition has been disabled. A feature token must be
  supplied to use the server.
* Backup has been enabled for partial sync.


# Release 3.4.5

### Bugs fixed
* Ensures that all system realms use the "default" sync label in order to avoid race conditions on startup

### Enhancements
* None


# Release 3.4.4

### Bugs fixed
* KubernetesSyncWorker: Adds a workaround for a bug in kube-router, which can
cause intermittent connection failures to sync workers.

### Enhancements
* None


# Release 3.4.3

### Bugs fixed
* Fixed a bug that caused Realm files created with legacy ROS versions to be inaccessible for non-admin users.
* Kubernetes API requests will be retried when they receive HTTP status code 429 (Too many requests)

### Enhancements
* None


# Release 3.4.2

### Bugs fixed
* None

### Enhancements
* KubernetesSyncWorker can now operate without synchronous backup when run with a single replica


# Release 3.4.1

### Bugs fixed
* None

### Enhancements
* None


# Release 3.4.0

### Bugs fixed
* Make sure node.js server addresses have type AddressInfo.

### Enhancements
* None


# Release 3.3.0

### Bugs fixed
* None

### Enhancements
* Expose API to enable admin users to convert between Realm types (`PATCH realms/files/:path`).
* Throw a more meaningful error when attempting to open a Realm with the incorrect type.
* Include the ROS version in the `/health` response.
* Uses realm-sync-server 3.3.0


# Release 3.1.8

### Bugs fixed
* Uses realm-sync-server 3.2.2, which should fix statsd

### Enhancements
* None


# Release 3.1.7

### Bugs fixed
* None

### Enhancements
* None


# Release 3.1.6

### Bugs fixed
* Uses realm-sync 3.1.1, which fixes statsd output

### Enhancements
* None


# Release 3.1.5

### Bugs fixed
* None

### Enhancements
* None


# Release 3.1.4

### Bugs fixed
* None

### Enhancements
* None


# Release 3.1.3

### Bugs fixed
* RealmFactory will now force close Realms on user deletion.

### Enhancements
* None


# Release 3.1.2

### Bugs fixed
* None

### Enhancements
* None


# Release 3.1.2-beta.1

### Bugs fixed
* Fixed a bug that caused an invalid provider configuration to prevent ROS from initializing.

### Enhancements
* None


# Release 3.1.1

### Bugs fixed
* None

### Enhancements
* None


# Release 2.8.2

### Bugs fixed
* None

### Enhancements
* The server periodically logs the number of open files and their file type.
* The proxy logs the number of open connections to the sync server.
* Added the ability to specify a custom Authorization header name for incoming HTTP requests.
* Add retry logic when internally accessing services in case some services are behind
  a proprietary HTTP proxy that doesn't start proxying incoming requests right away.
* Added an overwrite option for the backup to specify that the destination
  directory may be overwritten


# Release 3.1.0

### Bugs fixed
* None

### Enhancements
* None


# Release 3.1.0-rc.1

### Bugs fixed
* Proper HTTP responses after Upgrade failures.
* npm will no longer try to download dependencies that are already bundled when installing `realm-object-server`.

### Enhancements
* Improvements to Winston-based loggers:
  * `WinstonLogger` now exposes its internal winston logger instance, allowing for customization such as adding more transports.
  * `ConsoleLogger`, `FileLogger`, and `FileConsoleLogger` gained new parameters on their constructors for the winston transport options.
* Each incoming request gets a UUID for tracking.
* Trace level logging of HTTP requests and responses.
* Added `forceCodeConfig` on the `IAuthProviderConfig` interface to allow marking certain providers
as protected, ensuring that their configuration is reset upon ROS restart.
* `ros init`-created apps get file logging enabled by default.
* The `%BASE_URL%` template variable will no longer contain trailing slashes.


# Release 3.0.0

### Breaking Changes
* Using realm-sync 3.0 with protocol breaking changes. This release is protocol backwards compatible
  with existing SDKs when syncing "full-realm" Realms, but requires the following versions when using partial sync:
  - Java: 5.0.0
  - Cocoa: 3.2.0
  - Javascript: 2.3.0
  - .NET: 2.2.0 - will be released soon.
* `SyncService`'s `dataPath` configuration property is now deprecated and will be removed in a
  future version. The current default value of './sync' (relative to the server's `dataPath`)
  will be used after the removal.
* A new default realm is created by the server and given the
  sync path "/default". The default Realm only contains a schema
  version right now. Later it will contain the data currently in
  the admin Realm and other internal Realms.
* Server Realms are grouped into three types: "full-realm", "reference-realm",
  and "partial-realm". The realm type is stored in a new column in the admin Realm.
  "full-realm" realms can be used for full sync. "reference-realm" realms
  are used for partial sync. Queries are made in "reference-realm" realms.
  "partial-realm" realms are used by clients that connect to partial sync
  and have urls containing "__partial".
* A permission system is made for the three types of Realms.
  * Full realms have the standard permission system and a non-admin user only
    has access to its own Realms or Reams with explicit permissions.
  * Reference Realms are freely accessible by everybody. Object level permissions
    will take care of restricting access.
  * Partial Realms are individual and can only be used by the owner.
* A Reference Realm is made automatically when partial sync is started with a new
  url. A user can only create a new reference Realm in its own
  directory. An admin user can create arbitrary reference Realms.
* A realm can never switch type. It is not allowed to perform partial sync with a
  "full-realm" Realm. It is allowed for an admin user to perform full sync with
  a reference realm.
* The default Realm has type "reference-realm" and can be used for partial sync by
  everybody out of the box.

### Bugs fixed
* The JWT auth provider error messages will now correctly serialize the rejection reason.

### Enhancements
* Added `emailHandlerConfig` to the `PasswordAuthProviderConfig` to use a nodemailer to send password reset and email confirmation emails.
* Added UI for email confirmation and password reset on /confirm-email and /reset-password respectively.
* A new default realm is created by the server and given the
  sync path "/default". The default Realm only contains a schema
  version right now. Later it will contain the data currently in
  the admin Realm and other internal Realms.


# Release 3.0.0-rc.1

### Bugs fixed
* None

### Enhancements
* None


# Release 3.0.0-beta.5

### Bugs fixed
* The build script now copies the password reset assets to the dist folder.

### Enhancements
* None


# Release 3.0.0-beta.4

### Bugs fixed
* The build script now copies the email templates to the dist folder, avoiding a crash
* The JWT auth provider error messages will now correctly serialize the rejection reason.

### Enhancements
* None


# Release 3.0.0-beta.3

### Bugs fixed
* None

### Enhancements
* UI for email confirmation and password reset on /confirm-email and /reset-password respectively
* Added `emailHandlerConfig` to the `PasswordAuthProviderConfig` to use a nodemailer to send password reset and email confirmation emails.

* A new default realm is created by the server and given the 
  sync path "/default". The default Realm only contains a schema
  version right now. Later it will contain the data currently in 
  the admin Realm and other internal Realms.
* Server Realms are grouped into three types: "full-realm", "reference-realm",
  and "partial-realm". The realm type is stored in a new column in the admin Realm.
  "full-realm" realms can be used for full sync. "reference-realm" realms
  are used for partial sync. Queries are made in "reference-realm" realms.
  "partial-realm" realms are used by clients that connect to partial sync
  and have urls containing "__partial".
* A permission system is made for the three types of Realms.
* Full realms have the standard permission system and a non-admin user only
  has access to its own Realms or Reams with explicit permissions.
* Reference Realms are freely accessible by everybody. Object level permissions
  will take care of restricting access.
* Partial Realms are individual and can only be used by the owner.
* A Reference Realm is made automatically when partial sync is started with a new
  url. A user can only create a new reference Realm in its own
  directory. An admin user can create arbitrary reference Realms.
* A realm can never switch type. It is not allowed to perform partial sync with a
  "full-realm" Realm. It is allowed for an admin user to perform full sync with
  a reference realm.
* The default Realm has type "reference-realm" and can be used for partial sync by
  everybody out of the box.


# Release 3.0.0-beta.2

### Bugs fixed
* None

### Enhancements
* None


# Release 3.0.0-beta.1

### Breaking changes
* None

### Bugs fixed
* None

### Enhancements
* None


# Release 2.8.1

### Bugs fixed
* None

### Enhancements
* Added the ability to specify a custom Authorization header name for incoming HTTP requests.
* Add retry logic when internally accessing services in case some services are behind
  a proprietary HTTP proxy that doesn't start proxying incoming requests right away.


# Release 3.0.0-alpha.9

### Breaking changes
* None

### Bugs fixed
* None

### Enhancements
* None


# Release 3.0.0-alpha.8

### Breaking changes
* None

### Bugs fixed
* None

### Enhancements
* None


# Release 3.0.0-alpha.7

### Breaking changes
* None

### Bugs fixed
* None

### Enhancements
* None


# Release 2.8.0

### Bugs fixed
* None

### Enhancements
* None


# Release 2.7.5

### Bugs fixed
* Fixing signatures and comments for index.ts and index.js files

### Enhancements
* None


# Release 2.7.4

### Bugs fixed
* None

### Enhancements
* In order not to be opinionated. The package-lock.json will not be generated with `ros init` commands


# Release 3.0.0-alpha.6

### Breaking changes
* None

### Bugs fixed
* None

### Enhancements
* None


# Release 3.0.0-alpha.5

### Breaking changes
* None

### Bugs fixed
* None

### Enhancements
* None


# Release 2.7.3

### Bugs fixed
* The /health endpoint now responds correctly to an OPTIONS / CORS-preflight request

### Enhancements
* None


# Release 2.7.2

### Breaking changes
* None

### Bugs fixed
* `Discovery.prototype.waitForService` now unsubscribes from the service watch when it resolves.
  Not unsubscribing could cause some service discovery implementations to leak.

### Enhancements
* None


# Release 3.0.0-alpha.4

### Breaking changes
* None

### Bugs fixed
* None

### Enhancements
* None


# Release 3.0.0-alpha.3

### Breaking changes
* None

### Bugs fixed
* None

### Enhancements
* None


# Release 3.0.0-alpha.2

### Breaking changes
* None

### Bugs fixed
* None

### Enhancements
* None


# Release 3.0.0-alpha.1

### Breaking changes
* Using realm-sync 3.0 with protocol breaking changes.

### Bugs fixed
* None

### Enhancements
* None


# Release 2.7.1

### Breaking changes
* Moved the dependency on @types/cors from dev to actual dependency. This fixes issues when using ROS in a TypeScript project.

### Bugs fixed
* None

### Enhancements
* None


# Release 2.7.0

### Breaking changes
* None

### Bugs fixed
* None

### Enhancements
* Added `emailHandler` property on the `PasswordAuthProvider` config object. Set that to receive callbacks
whenever a user requests a password reset.
* A new token, called UserToken, that will be used by partial
  sync. The user token has this form
    {
        "app_id":"io.realm.Auth",
        "identity":"ecd6649d80c7ad8d0e2d29fa94268d06",
        "salt":"bb4522fa",
        "expires":1516373219,
        "is_admin":false
    }
  A user token is obtained by sending a refresh token to /auth without "path"
  in the body of the request.
* A new API has been exposed to enable, disable, and configure authentication providers at runtime. It is currently limited
to the built-in providers.


# Release 2.6.2

### Breaking changes
* None

### Bugs fixed
* None

### Enhancements
* Added `charactersToEscape` to the JwtAuthProvider config. If the user ids, generated by your custom provider
contain characters that need to be url encoded, use this to replace invalid characters with `_` and generate a
`userId` that is valid for ROS purposes.


# Release 2.6.1

### Breaking changes
* None

### Bugs fixed
* Fixed an issue with `ros init` not installing the typescript dependency and subsequently, `npm start` failing.

### Enhancements
* None


# Release 2.6.0

### Breaking changes
* The `DELETE auth/user/:userId` endpoint is now deprecated and will be removed at a later version. Instead use
`DELETE auth/users/:userId` (`user` is now plural - `users` to align with the other endpoints mounted on `auth`).

### Bugs fixed
* In clustered scenarios, `/health` should report the overall health of the cluster. If interested in
the health of a single instance, pass `?thisInstance=true` as query string.

### Enhancements
* Expose configuration options for the JWT Auth Provider to allow customizing the names of the `userId` and `isAdmin` fields.
* Adds an optional `requiredAttributes` option to the JWT Auth Provider, allowing filtering of JWT tokens.
* Adds an optional `providerName` option to the JWT Auth Provider, allowing the provider to be enabled under different names.
* Added Anonymous and Nickname auth providers.


# Release 2.5.1

### Breaking changes
* None

### Bugs fixed
* Fixed an issue in Server when using PrometheusStatsSink where the metrics
  were bring created on each connection.

### Enhancements
* None


# Release 2.5.0

### Breaking changes
* Some methods and properties that are considered internal API have been marked private. This will show
up as compilation errors for typescript projects where they are accessed. While their usage is discouraged,
you can temporarily silence the errors by using the bracket notation. For example, `server.realmFactory.open`
can now be invoked by replacing it with `server['realmFactory'].open()`. Ultimately, you should move your
project to use only the public API.
* The following classes have been renamed:
  * `Console` -> `ConsoleLogger`
  * `File` -> `FileLogger`
  * `FileConsole` -> `FileConsoleLogger`
  * `AzureAuthServiceConfig` -> `AzureAuthProviderConfig`
  * `CloudkitAuthProviderParams` -> `CloudkitAuthProviderConfig`
  * `GoogleAuthServiceConfig` -> `GoogleAuthProviderConfig`
  * `PasswordAuthParams` -> `PasswordAuthProviderConfig`
  * `Mute` -> `MuteLogger`
  * `ServerStartParams` -> `ServerConfig`

### Bugs fixed
* Tokens without expiration date can now be revoked.
* Admin.json will now correctly be written, even if you provide custom private and public keys.

### Enhancements
* Expected HTTP access log entries are now logged on the "debug" level to avoid flooding the "info" log level.
HTTP responses with status code 400 or above are now logged on "detail" level.
This silence the verbose "GET /healthz HTTP/1.1 200" entries.
* Expose a configuration option - `writeAdminTokenToJson` on `ServerConfig` that controls whether the admin token
will be written to `data/keys/admin.json`.

* Expose `jsonBodyLimit` in the `ServerConfig` interface to allow increasing the maximum request size.


# Release 2.4.2

### Bugs fixed
* Sometimes (and usuallly when starting ROS), an unnecessary warning was logged:
'warn: TokenValidator couldn't check if token was revoked: The TokenRevocationRealm wasn't opened.'
It no longer is.
* Fixed a bug in RealmFactory where nonfatal errors would reject opening a Realm.

### Enhancements
* None


# Release 2.4.1

### Bugs fixed
* 'ros start' now works again. (Regression was introduced in 2.4.0)

### Enhancements
* None


# Release 2.4.0

### Bugs fixed
* Fixed an issue that allowed non-admin users to create Realms in other users'
home folders.
* Fixed a bug causing the failover logic in SyncProxyService to trigger for
  no good reason. This would manifest itself in "End of input" error messages
  on the client in enterprise/cloud deployments.

### Enhancements
* Added `server.ensureRealmExists` API to create a Realm if it doesn't exist
already.


# Release 2.3.0

### Bugs fixed
* None

### Enhancements
* Indicate the version of ROS using `X-Powered-By` Header.
* Added `Server.applyPermissions` method to allow changing permissions without
having to log in with an admin user.


# Release 2.2.0

### Bugs fixed
* Export the JWT provider

### Enhancements
* Export stats classes and interfaces


# Release 2.1.1

### Bugs fixed
* Fixed an import statement to make it work on case-sensitive file systems (Linux).
* Fixed a bug rendering `ros backup` useless because of incomplete path
  resolution for `realm-backup`.

### Enhancements
* None


# Release 2.1.0

### Bugs fixed
* The LogService will now respect token revocations (#735)
* Revoked tokens will now never be assigned to the req.authToken.

### Enhancements
* TypeScript and JavaScript templates now have .gitignore.
* The manual backup command is now available as `ros backup`.


# Release 2.0.23

### Bugs fixed
* Fixes MixpanelService issue for Enterprise where some stats might not be available until
  the sync proxy is fully running.

### Enhancements
* Added JWT authentication provider. It allows you to create a custom
  authentication service that issues signed Json Web Tokens that contain a
  `userId` and optional `isAdmin` fields. The app then transmits the token to
  ROS which verifies the signature and authenticates a user with the provided
  `userId`.


# Release 2.0.22

### Bugs fixed
* The health service no longer responds with 200 OK unless the server has fully
  started. It is 503 in case the server is still loading.
* The admin token user can now apply permission changes successfully.
* The early log messages do not get skipped in Studio any more.
* Users now have read-write access to their `/~/__permission` realms (again).
  The recent switch to read-only was an unintended breaking change.
* Fixed a potential race in the permission service. It reported itself started
  before setting up all the listeners and granting default permissions.
* [Object Server] Fixed a bug where deleted-then-recreated objects with identical
  primary keys become empty.
* [Object Server] Fixed a bug in outward partial sync to ensure
  convergence of partial sync in the case where the client creates a primary key object, that is already present on the server, and subscribes to it in the same transaction.
* Added error handling to the internal requests to the load balancer. This
  should fix some unhandled promise rejections.

### Enhancements
* TypeScript and JavaScript templates now have .gitignore


# Release 2.0.21

### Bugs fixed
* Close all Permission Realm files used to avoid running out of file handles.

### Enhancements
* None


# Release 2.0.18

### Bugs fixed
* Realms with invalid paths are now rejected. Previously ROS would just create
  unsyncable realms.
* Realms with invalid paths are now skipped during 1-to-2 migration. This is
  required because ROS-1 has the same behavior creating unsyncable realms, which
  we are not going to fix.
* Non-existent data files are not copied during 1-to-2 migration.
* The default port for BasicServer's https is now properly set to 9443
* HTTPS key and cert are now validated before attempting to start
* server.shutdown() is now more forgiving in failed state scenarios

### Enhancements
* Server now has a simple method called `openRealm` that takes a remote path, like `/__admin` for example. This is always opened up with the internal server admin user. The schema is optional. 


# Release 2.0.17

### Bugs fixed
* The migration tool now also migrates global realms.
* The default port for BasicServer's https is now properly set to 9443

### Enhancements
* There are two new special realms where permissions are reflected.
  `/<userid>/__perm` contains user-specific permissions and `/__perm` contains
  wildcard permissions. The old special realms are still available and reflect
  the same permissions, but they might contain duplicates. They are only there
  for compatibility and will be removed in the future.
* `ros migrate` will copy realm files by default. Specify `--norealms` to disable that.
* Added notice to users about the long time 'ros init' can take.
* Updated realm-js to version 2.0.5


# Release 2.0.16

### Breaking changes
* None

### Bugs fixed
* Fixed a problem in the install script where nvm is installed by homebrew.
* Added note to install script reminding the user to use the correct Node.js version.
* Fixed an issue with exporting all custom realm symbols
* Added support Visual Studio Code debugging and running when generating a server setup with `ros init`
* Opening a partially synced Realm before the master Realm was created now works correctly
* Terms of service is now persisted under the user's home directory. Fixes \#550

### Enhancements
* None

### Internals
* Updated the TS and JS templates to be easier to modify.
* Terms of service now generates a distinctId as a UUID and uses that in all mixpanel events. Fixes \#600
* Adding Mixpanel Usage Stats with Incremental timer
* Adds simple stats collection interfaces, loosely matching that of prom-client, a Prometheus stats
  emitter. In developer edition, metrics are stored in-memory, allowing mixpanel to access them.
* Adds ROS usage by emitting to mixpanel data about the connections that go through the SyncProxyService
* Exposes mix panel interface by gating it behind setting a distinctId. This is typically loaded from
  the agreement file.
* Created a MixpanelService which handles emitting stats periodically to mixpanel.


# Release 2.0.15

### Breaking changes
* None

### Bugs fixed
* Fixed a bug preventing from migrating from ROS1 when `cluster_node_id` is
* Fixed a bug in SingleProcessDiscovery where find by tag returned unexpected
  results
* Fixed a bug in PermissionService where the listeners could potentially
  operate on missing or invalidated objects
* Return a proper error when using the admin token to make permission changes
  where the userId might not exist.
* Made sure that all symbols in `./realms/**/*.ts` are now exported

### Enhancements
* None

### Internals
* Extended RealmDirectoryService unit tests
* Created exception class for ServiceUnavailable


# Release 2.0.14

### Breaking changes
* None

### Bugs fixed
* None

### Enhancements
* Update Node in the Docker image to 6.11.5

### Internals
* None

# Release 2.0.13

### Breaking changes
* None

### Bugs fixed
* None

### Enhancements
* The 1-to-2 migration now checks that the source directory is a valid root dir
  and makes some suggestions if it is not.
* THe 1-to-2 migration now checks that the destination directory is empty and
  fails with a message about that if it is not an empty dir.
* Expose the ROS port on the Docker container, to work with `docker run -P` for exposing on a random port.

### Internals
* None

# Release 2.0.12

### Breaking changes
* None

### Bugs fixed
* The LogService WebSocket endpoints now needs an authentication message with a valid access or refresh token, within
  the first second of connecting to them. Realm Studio sends this message starting from v1.3.0.

### Enhancements
* Added comments to the `ros init` template files to describe available configs
* A welcome page is now available to the user when visiting http://localhost:9080/ in a web-browser.
* Added install script

### Internals
* Added acceptance testing against the install script for multiple platforms.

# Release 2.0.11

### Breaking changes
* None

### Bugs fixed
* Fix installation issue (ursa) on various platforms
* Fix's middlewares not being registered to services 

### Enhancements
* None

### Internals
* Use node-rsa in favor of ursa.

# Release 2.0.10

### Breaking changes
* None

### Bugs fixed
* Fixes a circular dependency in built package

### Enhancements
* None

### Internals
* None

# Release 2.0.9

### Breaking changes
* None

### Bugs fixed
* Removes "del" as a dependency, fixing startup
* Exports RealmFactory and RealmDefinition classes

### Enhancements
* None

### Internals
* Publishing releases now automatically makes a release in the public reposutory
* CHANGELOG.md is now maintained automatically from RELEASENOTES.md
* Release notes should now be updated in RELEASENOTES.md

# Release 2.0.8

### Breaking changes
* None

### Bugs fixed
* Make sync client logs less verbose (Fixes \#433)
* Render the service metadata into the message (Fixes \#233, \#250)

### Enhancements
* Information about the feature token is now logged upon startup.

### Internals
* Silences migration tests (Fixes #486)
* Fixed bug in CloudKit auth provider: https://github.com/realm/realm-object-server/issues/282
* Make releases on public repo
* Update private repository name
* New changelog workflow

## 2.0.7

### Breaking changes
* None

### Bugs fixed
* Fixed several possible race conditions during server start and stop.

### Enhancements
* None

### Internals
* Introduces a timeout function which will race a regular promise. This is crucial for avoiding deadlocks in service requests.
* SyncProxyService now uses a shared cache of backend promises, creating less work when multiple connections for the same realm happen at the same time. Also avoids race conditions in this case.
* Introduced a RealmFactory class which can provide access to Realms on backend sync workers. This is now separated from the Server class.
* Introduced ServerState, which is used to prohibit request processing when a service is not completely ready. This avoids some race conditions, mostly during shutdown. Possible fix for #327.
* discovery.watchService will now fire an available event if the service is available when called. This simplifies a lot of situations where this is done by the caller.


## 2.0.6

### Breaking changes
* None

### Bugs fixed
* Switch to `realm-sync-2.1.0`, which fixes a "use-after-free" crash in
  realm-sync-server node package.

### Enhancements
* None

### Internals
* Switch to `realm-2.0.1`.

## 2.0.5

### Breaking changes
* None

### Bugs fixed
* Check Node version and present error message if not up-to-date
* Fixed an issue where revoking a user's permissions to a realm was not reflected
  back to the owner's permission realm.
* Fixed an issue that causes a refresh token query to fail when the token has already expired [\#583](https://github.com/realm/ros/issues/583)  

### Enhancements
* None

### Internals
* None

## 2.0.4

### Breaking changes
* None

### Bugs fixed
* None

### Enhancements
* None

### Internals
* Skip prompt with `ROS_SKIP_PROMPTS` environment variable

## 2.0.3

### Breaking changes
* None

### Bugs fixed
* None

### Enhancements
* None

### Internals
* The default IP when starting ROS is now 0.0.0.0 instead of 127.0.0.1.

## 2.0.2

### Breaking changes
* None

### Bugs fixed
* Generating a template with `ros init --template ts` will now have the correct `@types/*` because they have been moved out of `devDependencies` and into `dependencies`

### Enhancements
* None

### Internals
* `@types/*` for core runtime modules have been moved out of `devDependencies` and into `dependencies`


## 2.0.1

### Breaking changes
* None

### Bugs fixed
* Fixed `ros init` failing due to missing template files

### Enhancements
* None

### Internals
* None

## 2.0.0

### Breaking changes
* `realm-object-server-agreement.json` now requires 3 keys: `email`, `terms` and `agreeToLearnAboutUpdatesAndFixes`

### Bugs fixed
* Fixed Terms of Service agreement for Docker image

### Enhancements
* Added ROS init with a typescript and javascript flag

### Internals
* Publishes docker image to `realm/realm-object-server` (new location).
* Update to realm-2.0.0

## 2.0.0-rc.12

### Breaking changes
* None

### Bugs fixed
* Addressed a race condition where Realm.open can be called twice for the same Synced Realm
* Addressed an undefined object error where a Realm is open (but there is no sync session) and discovery issues a service handle change.

### Enhancements
* None

### Internals
* Fix the flaky permission tests


## 2.0.0-rc.11

### Fixed Bugs

* Log level from command line is propagated to sync server.
* Public and private key from the command line are used by the server.


## 2.0.0-rc.10

### Enhancements

* Added register argument to server.getSyncedRealm. This ensures that the
  SyncedRealm is not persisted in the cache.

### Fixed Bugs

* Ensure that services that require SyncedRealms have all required data before
  serving requests


## 2.0.0.rc9

### Breaking changes

### Fixed bugs
* Fixed a situation where getting a userId could be null in updateOrCreateUserPermissionWithAdminPermission in PermissionsService

## 2.0.0.rc8

### Breaking changes

### Enhancements
* Also skip Email prompts if ROS_SKIP_PROMPTS environment var is set.

### Fixed bugs
* Fixed OnDemand Permissions from Admin Realm now handles wildcard permissions appropriately
* Mocha Test now run with compilers, however will need to remove in future.

### Internals

## 2.0.0.rc7

### Breaking changes
* Access tokens now have `sync_label` instead of `syncLabel` when in serialized
  form.

### Enhancements
* Added the agreement to license email step for the BasicServer

### Fixed bugs
* SyncProxyService: Fixed an issue when using sharded sync workers
* Fixed the issue when a synced realm used internally would be undefined or
  invalidated because of sync worker unavailability.

### Internals

* Changed the SyncedRealm class to return a Promise<Realm>. Once it resolves,
  the Realm is there, with valid syncSession which does not get destroyed when
  the sync worker fails over. It utilizes the new override_server() API to
  make the session reconnect to the new sync worker.
* Fixed all the other parts of ROS which use SyncedRealm. Some functions become
  async because of that.
* Changed the way the server starts and stops. Now there is no barrier between
  starting services and registering them. This is required, because now some
  services, in order to start, wait for the Sync service to register.
* Update JS to RC22 and Sync to 2.0.2
* Updated the schema for `/__wildcardpermissions` to match the `/~/__permission` Realms, using `userId = *` for these `Permission` objects.

## 2.0.0-rc.6

### Fixed bugs
* Fixed a bug in HTTPS support (sync proxy) [\#512](https://github.com/realm/ros/issues/512)


## 2.0.0-rc5

### Breaking changes

* Changed the password provider and PasswordRealm schema.
  The PasswordRealm now stores iterations, key length, and digest for each row.
* Changed the default digest from sha256 to sha512 in the password provider.

### Enhancements

* Add deleteUser to the AuthProvider API as an optional method.
* Implemented deleteUser for the password provider.
* Added provider User deletions to the AuthService.

### Fixed bugs

* "--loglevel all" was rejected. [\#500](https://github.com/realm/ros/issues/500)
* loglevel passed via CLI was ignored. [\#509](https://github.com/realm/ros/issues/509)
* Permission change by email now is processed correctly [\#508](https://github.com/realm/ros/issues/508) [\#426](https://github.com/realm/ros/issues/426)

### Internals

* Changed the default size of the salt length from 10,000 to 32 bytes.
* New unit tests for the password provider.
* Upgraded the migration script to take the new PasswordRealm schema into account.
* Adding name and reason when throwing InvalidParameters.
* Update JS to RC-20


## 2.0.0-rc4

### Breaking changes

### Enhancements

* Added support for HTTPS.

### Fixed bugs

### Internals


## 2.0.0-rc3

### Breaking changes

### Enhancements

* Documentation for manual backup.

### Fixed bugs

* Permission changes now work properly when reducing privileges [\#438](https://github.com/realm/ros/issues/438)
* Changed the name of `__starpermissions` Realm to `__wildcardpermissions`. The object class
  name in it is now just `Permission` instead of `StarSpecificPermission`.
* All users now have read-only access to `__wildcardpermissions` on startup [\#431](https://github.com/realm/ros/issues/431)
* Grantor permission are reflected [\#491](https://github.com/realm/ros/issues/491) and [\#427](https://github.com/realm/ros/issues/427)
* If attempting to change permissions with a metadata value matching no users, an error is thrown instead of stalling forever.

### Internals

* Integration tests for Realm deletion.
* Integration tests for user deletion.
* Lint clean up.
* Moved CLI functionality to BasicServer

## 2.0.0-rc2

### Enhancements

* There is now a migration tool integrated into ros cli.
* The API for user and realm deletion has been added.
