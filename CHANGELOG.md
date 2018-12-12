# Release 3.16.1 (2018-12-12)

### Enhancements
* None

### Fixed
* A segfault related to state size calculation could cause frequent restarts of the server. (Issue [#1374](https://github.com/realm/realm-object-server-private/issues/1374))
* When deleting a reference Realm, partial views associated with it will now be removed. (Issue [#1021](https://github.com/realm/realm-object-server-private/issues/1021))
* Fixed a bug that would prevent a user from logging in with two different authentication providers. This could be observed if two JWT providers were setup and produced identical user ids (e.g. a `user` and `admin` JWT providers where an admin user can login with both) or when users were manually created by calling the `AuthService.createOrUpdateUser` API. (Issue [#1372](https://github.com/realm/realm-object-server-private/issues/1372))
* Fixed several log messages printing not providing contextual variable information. For example, the message "Permissions: The user with ID '%1' is not a member of any roles that have Class-level permissions. This is usually an error." will now print the the user id instead of "%1".
* Fixed a an issue that caused the server crash with message: "Assertion failed: m_unblocked_changesets_from_downstream_byte_size == 0". (Issue [#2641](https://github.com/realm/realm-sync/issues/2641)).

### Compatibility
* Server API's are backwards compatible with all previous ROS releases in the 3.x series.
* The server is compatible with all previous [SDKs supporting the ROS 3.x series](https://docs.realm.io/platform/using-synced-realms/troubleshoot/version-compatibilities).

### Installation & rollback instructions
Please see the [Realm Docs](https://docs.realm.io/platform/self-hosted/installation) for installation, upgrade and rollback instructions.

### Notable known issues
* Encrypting existing realm files is not possible. Only fresh deployments with zero state can use realms encryption. We're working on a migration path for existing deployments.
* Server side Realm files do not compact automatically. The standalone commandline tool "realm-vacuum" can be manually executed to compress free space and old history (See https://docs.realm.io/platform/self-hosted/manage/server-side-file-growth#vacuum-utility).


# Release 3.16.0 (2018-12-04)

### Enhancements
* The server can now be configured to periodically "vacuum" random Realms by freeing unused reserved space and likely reduce the file size on disk. This can be configured by providing a value for `vacuumIntervalInSeconds` in `server.start()`. If you want to disable the feature, specify a negative value. ([realm-sync/#2497](https://github.com/realm/realm-sync/issues/2497))
* Exposed an endpoint to update the status of users. Currently, only two statuses are supported - `active` and `suspended`. When a user is `suspended`, they won't be able to authenticate against ROS or obtain new access tokens. Their existing access tokens **will not** be revoked, so they will still be able to synchronize until the access tokens expire (typically 6 minutes). ([realm-sync/#2578](https://github.com/realm/realm-sync/issues/2578))
* The log compaction algorithm has been improved, and should produce better results. It should also consume less memory while running.
* The error message emitted when trying to open a Realm with an invalid path has been enhanced to provide more relevant information. Previously, the message was a static text, describing all scenarios which could produce invalid Realm paths (it used to start with `path is invalid. It should start with a slash, consist of Latin letters...`) and now it will specify what exactly is wrong with the path, for example: `The path '/~/cæt' (decoded: '/f52bcb1b8dc752ece60db5fe283820df/cæt') is invalid: encountered an invalid segment: 'cæt'. Error: segment is not composed of alphanumeric characters`. ([#1287](https://github.com/realm/realm-object-server-private/issues/1287))

### Fixed
* URL for documentation in the servers home page has been fixed to point to the correct Platform doc page. ([#1153](https://github.com/realm/realm-object-server-private/issues/1153))
* An index out of range error in query based sync is fixed. The bug would manifest itself with a "list ndx out of range" error.
* The `LIMIT` predicate was previously run before object level permissions were applied, which could result in less results being returned than were actually available.
* If encryption was enabled, decrypted pages were not released until the file was closed, causing excessive usage of memory. Pages are now reclaimed periodically, ensuring that memory usage stays low.
* The server will now notify clients that a client reset has occurred, even if the Realm is opened at the time. Previously clients would not be notified until the Realm was closed and reopened.
* Fixed an issue that could result in a shutdown of the sync-worker with the message "...PartialSync: Violation of no-merge invariant...".

### Compatibility
* Server API's are backwards compatible with all previous ROS releases in the 3.x series.
* The server is compatible with all previous [SDKs supporting the ROS 3.x series](https://docs.realm.io/platform/using-synced-realms/troubleshoot/version-compatibilities).

### Installation & rollback instructions
Please see the [Realm Docs](https://docs.realm.io/platform/self-hosted/installation) for installation, upgrade and rollback instructions.

### Notable known issues
* Encrypting existing realm files is not possible. Only fresh deployments with zero state can use realms encryption. We're working on a migration path for existing deployments.
* Server side Realm files do not compact automatically. The standalone commandline tool "realm-vacuum" can be manually executed to compress free space and old history (See https://docs.realm.io/platform/self-hosted/manage/server-side-file-growth#vacuum-utility).


# Release 3.15.0 (2018-11-21)

### Enhancements
* Added support for the latest Node.js 10 LTS.
* In cases of very high load the server could run out of memory. It's now possible to configure the maximum size of the backlog of changes that the server will accept before it starts rejecting connections. Clients will wait 5 min after a rejection before connecting again. 
The `SyncServiceConfig.maxUploadBacklog` should therefore be configured so high that the server will be busy handling the queued work for at least 5 min.

### Fixed
* Fixed an issue that could cause ROS to unnecessarily delete its entire cache folder when a user is deleted rather than just the files associated with that user. ([#1348](https://github.com/realm/realm-object-server-private/pull/1348), since v3.1.3)
* Fixed an issue that would prevent the proxy from connecting to the sync service if a request arrives before the sync service has started. This would have resulted in log messages, similar to `HTTP upgrade failed (service did not respond properly) ... "detail":"Timeout occured upgrading websocket request"`. ([#1349](https://github.com/realm/realm-object-server-private/pull/1349), since v2.0.7)

### Compatibility
* Server API's are backwards compatible with all previous ROS releases in the 3.x series.
* The server is compatible with all previous [SDKs supporting the ROS 3.x series](https://docs.realm.io/platform/using-synced-realms/troubleshoot/version-compatibilities).

### Installation & rollback instructions
Please see the [Realm Docs](https://docs.realm.io/platform/self-hosted/installation) for installation, upgrade and rollback instructions.

### Notable known issues
* Encrypting existing realm files is not possible. Only fresh deployments with zero state can use realms encryption. We're working on a migration path for existing deployments.
* Server side Realm files do not compact automatically. The standalone commandline tool "realm-vacuum" can be manually executed to compress free space and old history (See https://docs.realm.io/platform/self-hosted/manage/server-side-file-growth#vacuum-utility).


# Release 3.14.0 (2018-11-16)

### Enhancements
* Added two new config parameters - `verifyRealmsAtStart` and `runPrecheckInChildProcess` to replace the now deprecated `skipVerifyRealmsAtStart` and `disablePrecheckInChildProc` in the `SyncService` configuration object. The defaults for the new parameters are `false`, so unless explicitly configured, consistency checks of the partial Realms will **not** be run on startup. The old parameters will continue to be respected but will be removed in a future version. ([#1338](https://github.com/realm/realm-object-server-private/pull/1338))
* Expose `SyncServiceConfig.maxFilesInCache` to control the max number of files that will be kept in the sync server cache. ([#1340](https://github.com/realm/realm-object-server-private/issues/1340))

### Fixed
* Clarified the wording around an error that was occasionally being logged at a `warn` level with a message starting with `Internal sync error`. The error message now starts with `Unable to connect to a Realm` and there's a clarification that this is a transient error that the server will recover automatically from. Also, reduced the log level to `detail` to properly reflect the ephemeral nature of the error. ([#1291](https://github.com/realm/realm-object-server-private/issues/1291))

### Compatibility
* Server API's are backwards compatible with all previous ROS releases in the 3.x series.
* The server is compatible with all previous [SDKs supporting the ROS 3.x series](https://docs.realm.io/platform/using-synced-realms/troubleshoot/version-compatibilities).

### Installation & rollback instructions
Please see the [Realm Docs](https://docs.realm.io/platform/self-hosted/installation) for installation, upgrade and rollback instructions.

### Notable known issues
* Encrypting existing realm files is not possible. Only fresh deployments with zero state can use realms encryption. We're working on a migration path for existing deployments.
* Server side Realm files do not compact automatically. The standalone commandline tool "realm-vacuum" can be manually executed to compress free space and old history (See https://docs.realm.io/platform/self-hosted/manage/server-side-file-growth#vacuum-utility).


# Release 3.13.1 (2018-11-12)

### Enhancements
* None

### Fixed
* When using query-based sync, fatal error messages in the server log containing `name=realm::_impl::CorruptedPartialFileAssoc, message=Expired reference version` could be seen. This situation could be experienced if a reference file was accessed both through query-based sync and regular sync (i.e., through Realm Studio), and the server decided to perform log compaction on the reference file. This has now been fixed.
* A set of bugs that could lead to bad changesets were fixed. An example of an assertion, caused by these bugs, is: `[realm-core-5.10.0] Assertion failed: ndx < size() with (ndx, size()) = [742, 742]`. An example of an error in a log file, caused by these bugs, is: `ERROR: Client[1]: Connection[1]: Session[14]: Failed to parse, or apply received changeset: ndx out of range`.

### Compatibility
* Server API's are backwards compatible with all previous ROS releases in the 3.x series.
* The server is compatible with all previous [SDKs supporting the ROS 3.x series](https://docs.realm.io/platform/using-synced-realms/troubleshoot/version-compatibilities).

### Installation & rollback instructions
Please see the [Realm Docs](https://docs.realm.io/platform/self-hosted/installation) for installation, upgrade and rollback instructions.

### Notable known issues
* Encrypting existing realm files is not possible. Only fresh deployments with zero state can use realms encryption. We're working on a migration path for existing deployments.
* Server side Realm files do not compact automatically. The standalone commandline tool "realm-vacuum" can be manually executed to compress free space and old history (See https://docs.realm.io/platform/self-hosted/manage/server-side-file-growth#vacuum-utility).


# Release 3.13.0 (2018-11-06)

### Enhancements
* None

### Fixed
* Fix some cases where a ROS cluster on top of Consul will return `503 Service Unavailable` responses even though there was nothing wrong. Additionally, we've added more information when returning 503 responses, so it's easier to diagnose which service is causing problems.
* The Realm Object Server will now store all Realms it opens under the `data/realms` folder. Previously it stored some of the files under the documents folder of the currently logged in user or in the `Realm Object Server` folder where ROS is running from. The Realms in the old location (`Documents/Realm Object Server` and `ROS-install-folder/Realm Object Server`) can be safely deleted to reclaim some space.

### Breaking changes
* None

### Compatibility
* Server API's are backwards compatible with all previous ROS releases in the 3.x series.
* The server is compatible with all previous [SDKs supporting the ROS 3.x series](https://docs.realm.io/platform/using-synced-realms/troubleshoot/version-compatibilities).

### Installation & rollback instructions
Please see the [Realm Docs](https://docs.realm.io/platform/self-hosted/installation) for installation, upgrade and rollback instructions.

### Notable known issues
* Encrypting existing realm files is not possible. Only fresh deployments with zero state can use realms encryption. We're working on a migration path for existing deployments.
* Server side Realm files do not compact automatically. The standalone commandline tool "realm-vacuum" can be manually executed to compress free space and old history (See https://docs.realm.io/platform/self-hosted/manage/server-side-file-growth#vacuum-utility).


# Release 3.12.4 (2018-10-25)

### Enhancements 
* Reduced verbosity of some log messages.

### Fixed
* A bug in log compaction of link lists was fixed. This bug would lead to errors of the type "index out of range" or "ndx < size()".

### Compatibility
* Server API's are backwards compatible with all previous ROS releases in the 3.x series.
* The server is compatible with all previous [SDKs supporting the ROS 3.x series](https://docs.realm.io/platform/using-synced-realms/troubleshoot/version-compatibilities).

### Installation & rollback instructions
Please see the [Realm Docs](https://docs.realm.io/platform/self-hosted/installation) for installation, upgrade and rollback instructions.

### Notable known issues
* Encrypting existing realm files is not possible. Only fresh deployments with zero state can use realms encryption. We're working on a migration path for existing deployments.
* Server side Realm files do not compact automatically. The standalone commandline tool "realm-vacuum" can be manually executed to compress free space and old history (See https://docs.realm.io/platform/self-hosted/manage/server-side-file-growth#vacuum-utility).


# Release 3.12.2 (2018-10-18)

### Enhancements
* Added `syncServiceConfigOverride` callback to `BasicServer`'s start params to allow customizing the default values for the sync service config properties without having to add all services manually. ([#1303](https://github.com/realm/realm-object-server-private/pull/1303))

### Fixed
* Added ability to override `enableRealmStateSizeReporting` setting to `false` using an endpoints annotation.

### Compatibility
* Server API's are backwards compatible with all previous ROS releases in the 3.x series.
* The server is compatible with all previous [SDKs supporting the ROS 3.x series](https://docs.realm.io/platform/using-synced-realms/troubleshoot/version-compatibilities).

### Installation & rollback instructions
Please see the [Realm Docs](https://docs.realm.io/platform/self-hosted/installation) for installation, upgrade and rollback instructions.

### Notable known issues
* Encrypting existing realm files is not possible. Only fresh deployments with zero state can use realms encryption. We're working on a migration path for existing deployments.
* Server side Realm files do not compact automatically. The standalone commandline tool "realm-vacuum" can be manually executed to compress free space and old history (See https://docs.realm.io/platform/self-hosted/manage/server-side-file-growth#vacuum-utility).


# Release 3.12.1 (2018-10-17)

### Enhancements
* The vacuum command is enhanced to take options history-type and bump-realm-version.

### Fixed
* Avoid crashing the server when compaction is requested for a file whose history type is not yet set to server (https://github.com/realm/realm-sync/pull/2492).

### Compatibility
* Server API's are backwards compatible with all previous ROS releases in the 3.x series.
* The server is compatible with all previous [SDKs supporting the ROS 3.x series](https://docs.realm.io/platform/using-synced-realms/troubleshoot/version-compatibilities).

### Installation & rollback instructions
Please see the [Realm Docs](https://docs.realm.io/platform/self-hosted/installation) for installation, upgrade and rollback instructions.

### Notable known issues
* Encrypting existing realm files is not possible. Only fresh deployments with zero state can use realms encryption. We're working on a migration path for existing deployments.
* Server side Realm files do not compact automatically. The standalone commandline tool "realm-vacuum" can be manually executed to compress free space and old history (See https://docs.realm.io/platform/self-hosted/manage/server-side-file-growth#vacuum-utility).


# Release 3.12.0 (2018-10-17)

### Enhancements
* Enabled user impersonation when opening Realms on the server. You can now open a Realm with a particular user rather than the admin user. This can be useful when opening partial Realms as object-level permissions are not applied to admin users. ([#1295](https://github.com/realm/realm-object-server-private/pull/1295))

### Fixed
* None

### Compatibility
* Server API's are backwards compatible with all previous ROS releases in the 3.x series.
* The server is compatible with all previous [SDKs supporting the ROS 3.x series](https://docs.realm.io/platform/using-synced-realms/troubleshoot/version-compatibilities).

### Installation & rollback instructions
Please see the [Realm Docs](https://docs.realm.io/platform/self-hosted/installation) for installation, upgrade and rollback instructions.

### Notable known issues
* Encrypting existing realm files is not possible. Only fresh deployments with zero state can use realms encryption. We're working on a migration path for existing deployments.
* Server side Realm files do not compact automatically. The standalone commandline tool "realm-vacuum" can be manually executed to compress free space and old history (See https://docs.realm.io/platform/self-hosted/manage/server-side-file-growth#vacuum-utility).


# Release 3.11.9 (2018-10-16)

### Enhancements
* Various log messages, that are emitted by the server when the access token has expired, are now emitted at detail level, rather than at error level. Since it is impossible to avoid all such cases, they should not be considered as errors (https://github.com/realm/realm-sync/issues/2455).
* Extended typescript definition for IRealmSyncServerConfiguration to accept the skipVerifyRealmsAtStart option, which defaults to false when omitted.

### Fixed
* Metric <prefix>.authentication.failed was sometimes incremented twice where it should only have been incremented once (https://github.com/realm/realm-sync/issues/2455).

### Compatibility
* Server API's are backwards compatible with all previous ROS releases in the 3.x series.
* The server is compatible with all previous [SDKs supporting the ROS 3.x series](https://docs.realm.io/platform/using-synced-realms/troubleshoot/version-compatibilities).

### Installation & rollback instructions
Please see the [Realm Docs](https://docs.realm.io/platform/self-hosted/installation) for installation, upgrade and rollback instructions.

### Notable known issues
* Encrypting existing realm files is not possible. Only fresh deployments with zero state can use realms encryption. We're working on a migration path for existing deployments.
* Server side Realm files do not compact automatically. The standalone commandline tool "realm-vacuum" can be manually executed to compress free space and old history (See https://docs.realm.io/platform/self-hosted/manage/server-side-file-growth#vacuum-utility).


# Release 3.11.8 (2018-10-15)

### Enhancements
* Added a counter named `ros_sync_proxy_backend_connection_errors`, which indicates the number of accumulated backend connection errors in the SyncProxyService.

### Fixed
* None

### Compatibility
* Server API's are backwards compatible with all previous ROS releases in the 3.x series.
* The server is compatible with all previous [SDKs supporting the ROS 3.x series](https://docs.realm.io/platform/using-synced-realms/troubleshoot/version-compatibilities).

### Installation & rollback instructions
Please see the [Realm Docs](https://docs.realm.io/platform/self-hosted/installation) for installation, upgrade and rollback instructions.

### Notable known issues
* Encrypting existing realm files is not possible. Only fresh deployments with zero state can use realms encryption. We're working on a migration path for existing deployments.
* Server side Realm files do not compact automatically. The standalone commandline tool "realm-vacuum" can be manually executed to compress free space and old history (See https://docs.realm.io/platform/self-hosted/manage/server-side-file-growth#vacuum-utility).


# Release 3.11.7 (2018-10-10)

### Enhancements
* Some adjustments were made in the configuration of Prometheus Metrics:
  * Ensure that recently-added metrics are named with `ros_sync_` prefix
  * Adjusted bucket intervals for `ros_sync_precheck_time_ms` to more appropriate values, ranging from 1s to 16m
* The sync server logs the maximum number of open files on start-up.
* The sync server node wrapper logs an error message on catching a fatal error and sleeps for two seconds to increase    the chance that the log message is emitted before the process aborts.
* Added maxOpenFiles to the typescript sync server configuration.

### Fixed
* The server is now able to handle recreating users with the same id (e.g. by using the JWT provider).
This was previously not supported and would have resulted in receiving a message like
`Client reset occurred for Realm at path ***. Shutting down preemptively` followed by a server
shutdown. (Issue [#1255](https://github.com/realm/realm-object-server-private/issues/1255), since v2.0)
* The default action of the sync server node wrapper on an uncaught exception is to abort instead of exit(1).

### Compatibility
* Server API's are backwards compatible with all previous ROS releases in the 3.x series.
* The server is compatible with all previous [SDKs supporting the ROS 3.x series](https://docs.realm.io/platform/using-synced-realms/troubleshoot/version-compatibilities).

### Installation & rollback instructions
Please see the [Realm Docs](https://docs.realm.io/platform/self-hosted/installation) for installation, upgrade and rollback instructions.

### Notable known issues
* Encrypting existing realm files is not possible. Only fresh deployments with zero state can use realms encryption. We're working on a migration path for existing deployments.
* Server side Realm files do not compact automatically. The standalone commandline tool "realm-vacuum" can be manually executed to compress free space and old history (See https://docs.realm.io/platform/self-hosted/manage/server-side-file-growth#vacuum-utility).


# Release 3.11.6 (2018-10-05)

### Enhancements
* The implementation of the merge algorithm has been made more efficient.
* New StatsD metric <prefix>.precheck_time (timing) emitted on completion of the server file prechecking process. It is the time taken, in milliseconds, by that prechecking process.

### Fixed
* None

### Compatibility
* Server API's are backwards compatible with all previous ROS releases in the 3.x series.
* The server is compatible with all previous [SDKs supporting the ROS 3.x series](https://docs.realm.io/platform/using-synced-realms/troubleshoot/version-compatibilities).

### Installation & rollback instructions
Please see the [Realm Docs](https://docs.realm.io/platform/self-hosted/installation) for installation, upgrade and rollback instructions.

### Notable known issues
* Encrypting existing realm files is not possible. Only fresh deployments with zero state can use realms encryption. We're working on a migration path for existing deployments.
* Server side Realm files do not compact automatically. The standalone commandline tool "realm-vacuum" can be manually executed to compress free space and old history (See https://docs.realm.io/platform/self-hosted/manage/server-side-file-growth#vacuum-utility).


# Release 3.11.5 (2018-10-04)

### Enhancements
* Performance improved when merging changes on the server.
* Reduced file size of server side realms.

### Fixed
* A bug was fixed where load-balanced installations would not properly place partial Realms on the same sync worker as its reference realm.

### Compatibility
* Server API's are backwards compatible with all previous ROS releases in the 3.x series.
* The server is compatible with all previous [SDKs supporting the ROS 3.x series](https://docs.realm.io/platform/using-synced-realms/troubleshoot/version-compatibilities).

### Installation & rollback instructions
Please see the [Realm Docs](https://docs.realm.io/platform/self-hosted/installation) for installation, upgrade and rollback instructions.

### Notable known issues
* Encrypting existing realm files is not possible. Only fresh deployments with zero state can use realms encryption. We're working on a migration path for existing deployments.
* Server side Realm files do not compact automatically. The standalone commandline tool "realm-vacuum" can be manually executed to compress free space and old history (See https://docs.realm.io/platform/self-hosted/manage/server-side-file-growth#vacuum-utility).


# Release 3.11.4 (2018-10-03)

### Enhancements
* Improved performance of the sync server partial sync precheck.

### Fixed
* None

### Compatibility
* Server API's are backwards compatible with all previous ROS releases in the 3.x series.
* The server is compatible with all previous [SDKs supporting the ROS 3.x series](https://docs.realm.io/platform/using-synced-realms/troubleshoot/version-compatibilities).

### Installation & rollback instructions
Please see the [Realm Docs](https://docs.realm.io/platform/self-hosted/installation) for installation, upgrade and rollback instructions.

### Notable known issues
* Encrypting existing realm files is not possible. Only fresh deployments with zero state can use realms encryption. We're working on a migration path for existing deployments.
* Server side Realm files do not compact automatically. The standalone commandline tool "realm-vacuum" can be manually executed to compress free space and old history (See https://docs.realm.io/platform/self-hosted/manage/server-side-file-growth#vacuum-utility).


# Release 3.11.3 (2018-10-03)

### Enhancements
* None

### Fixed
* Fixed an issue were statsd metrics from the syncWorker were not being picked up by ROS. The issue could be observed when the hostname
  of the system was fully-qualified, e.g., "sync.example.com".

### Compatibility
* Server API's are backwards compatible with all previous ROS releases in the 3.x series.
* The server is compatible with all previous [SDKs supporting the ROS 3.x series](https://docs.realm.io/platform/using-synced-realms/troubleshoot/version-compatibilities).

### Installation & rollback instructions
Please see the [Realm Docs](https://docs.realm.io/platform/self-hosted/installation) for installation, upgrade and rollback instructions.

### Notable known issues
* Encrypting existing realm files is not possible. Only fresh deployments with zero state can use realms encryption. We're working on a migration path for existing deployments.
* Server side Realm files do not compact automatically. The standalone commandline tool "realm-vacuum" can be manually executed to compress free space and old history (See https://docs.realm.io/platform/self-hosted/manage/server-side-file-growth#vacuum-utility).


# Release 3.11.0 (2018-09-17)

### Fixed
* Fixed a bug with query-based sync where when performing a query that would return a very large (>4 GB) resultset the server could crash with `std::runtime_error("Compression error")`. This issue has been present since Realm Object Server 3.0.
* Crashes related to changeset processing when using query-based sync have been fixed.

### Enhancements
* Clients using protocol version >=25 now always report download progress to the server, not only when they make writes. This allows the server to do history compaction much more aggressively, especially when there are many clients that rarely or never make writes. The server considers doing history compaction when an actual change is uploaded to the server. (Issue [#127](https://github.com/realm/realm-object-server/issues/127)

### Breaking changes
* None

### Compatibility
**NOTE:**
While the server is backwards-compatible with clients using protocol version 24 or below, clients at version 25 are not backwards-compatible with a server at protocol version 24. So the server must be upgraded to this version before any clients are upgraded.

See more about which SDK version supports sync protocol 25 here: [Version Compatibility for ROS 3.x](https://docs.realm.io/platform/using-synced-realms/troubleshoot/version-compatibilities).

### Installation & rollback instructions
Please see the [Realm Docs](https://docs.realm.io/platform/self-hosted/installation) for installation, upgrade and rollback instructions. 

### Notable known issues
* Encrypting existing realm files is not possible. Only fresh deployments with zero state can use realms encryption. We're working on a migration path for existing deployments.
* Server side Realm files do not compact automatically. The standalone commandline tool "realm-vacuum" can be manually executed to compress free space and old history (See https://docs.realm.io/platform/self-hosted/manage/server-side-file-growth#vacuum-utility).


# Release 3.10.7 (2018-09-11)

### Breaking changes
* None

### Bugs fixed
* Removed some redundant retry logic in the internal HTTP clients that could cause up to 6 seconds delay in responding to
some HTTP requests.
* Fixed a bug that could cause the server to preemptively terminate when a user (and their Realms) is deleted. This may have
been experienced by observing messages like: `Client reset occurred for Realm at path /some-path/__perm. Shutting down preemptively`
in the server logs. Issue reference: https://github.com/realm/realm-object-server-private/issues/1199. The issue has been
present since version 2.0.

### Enhancements
* None

### Installation & rollback instructions
Please see https://docs.realm.io/platform/self-hosted/installation for installation, upgrade and rollback instructions.

### Notable known issues
* Clients that never write to a Realm but connect to it often (e.g. a scenario where a single producer publishes updates to many read-only clients) will prevent the history compaction algorithm from ever compacting this Realm's history. A workaround is to have them write a dummy update every once in a while with frequency of a magnitude similar to the history time to live value. For example, if the history time to live is set to 30 days, read-only clients can be modified to write a dummy value every day. Then you'll have at most 31 days of uncompacted history. A fix will be released soon.
* If a single transaction is larger than 4 GB, the server can crash.
* Encrypting existing realm files is not possible. Only fresh deployments with zero state can use realms encryption. We're working on a migration path for existing deployments.
* Server side Realm files do not compact automatically. The standalone commandline tool "realm-vacuum" can be manually executed to compress free space and old history (See https://docs.realm.io/platform/self-hosted/manage/server-side-file-growth#vacuum-utility).


# Release 3.10.6 (2018-09-11)

### Breaking changes
* The function `loadFeatureToken` has been removed. It has had no effect and has been deprecated since version 3.0.

### Bugs fixed
* 3.10.0 introduced a change that forced ROS components to communicate over HTTPS when ROS itself was configured for HTTPS.
  However, on single-node deployments this caused communication to fail with hostname validation errors when the used SSL
  certificate was not valid over the loopback interface or `listenAddress` did not match the DNS name in the certificate.
  The fix is to not enable HTTPS communication between components by default. This feature is now enabled by setting the
  `httpsForInternalComponents` configuration option to `true` instead.
* Fixed a crash with sync client HTTP requests with a malformed `Content-Length` header. Such will now correctly result in
  responses with status code 400.

### Enhancements
* None

### Installation & rollback instructions
Please see https://docs.realm.io/platform/self-hosted/installation for installation, upgrade and rollback instructions.

### Notable known issues
* Encrypting existing realm files is not possible. Only fresh deployments with zero state can use realms encryption. We're working on a migration path for existing deployments.


# Release 3.10.3 (2018-09-03)

### Breaking changes
* None

### Bugs fixed
* None

### Enhancements
* The server can now encrypt its realms with an encryption key passed in the `realmsEncryptionKey` configuration property.

### Installation & rollback instructions
**WARNING**: A server with encrypted realms cannot be rolled back to an older version!
Please see https://docs.realm.io/platform/self-hosted/installation for installation, upgrade and rollback instructions.

### Notable known issues
* Encrypting existing realm files is not possible. Only fresh deployments with zero state can use realms encryption. We're working on a migration path for existing deployments.


# Release 3.10.2 (2018-08-31)

### Breaking changes
* None

### Bugs fixed
* Fixed the consistency checker such that it does not crash on empty partial Realms.

### Enhancements
* None

### Installation & rollback instructions
Please see https://docs.realm.io/platform/self-hosted/installation for installation, upgrade and rollback instructions. 


# Release 3.10.1 (2018-08-29)

### Breaking changes
* None

### Bugs fixed
* Adding a table and creating a subscription for it without having permissions to create the table could result in a `CrossTableLinkTarget` exception being thrown by Core.
* Outward partial sync was fixed to handle the case where temporary link targets have been previously deleted in the reference Realm. This bug could lead to crashes and error messages of type `index out of range` or an assertion of the form `ndx < m_size`. This bug could explain many of the `index out of range` crashes that have been seen. This bug has not led to bad changesets being generated, which means that there should be no remnants of the bug in existing Realms.

### Enhancements
* None

### Installation & rollback instructions
Please see https://docs.realm.io/platform/self-hosted/installation for installation, upgrade and rollback instructions.


# Release 3.10.0 (2018-08-28)

### Breaking changes
* None

### Bugs fixed
* None

### Enhancements
* The sync worker has been upgraded to a multithreaded architecture. It now has two major internal threads, a networking event loop thread, and one worker thread for performing potentially long-running tasks. This improves the responsiveness of the server while executing larger queries.
* The sync worker now uses an adaptive scheme for caching and reusing query results, which improves query time and decreases load on the server.

### Installation & rollback instructions
Please see https://docs.realm.io/platform/self-hosted/installation for installation, upgrade and rollback instructions. 


# Release 3.10.0-alpha.3 (2018-08-27)

### Breaking changes
* None

### Bugs fixed
* None

### Enhancements
* Refactored the internals of KubernetesSyncWorker to be a bit more
  straightforward. Each evaulation of the endpoints object will result
  in a new sync server configuration. This configuration is compared to the
  current one in order to determine if the server should be restarted.
* Configuration options can be read from the endpoints object's annotations
  when they are not overridden by the constructor. These options are:
  * `sync.realm.io/log-level` (string)
  * `sync.realm.io/enable-download-log-compaction` (boolean)
  * `sync.realm.io/max-download-size` (integer)
  * `sync.realm.io/enable-debug-mode` (boolean)
  * `sync.realm.io/history-ttl` (integer)
  * `sync.realm.io/history-compaction-interval` (integer)

### Installation & rollback instructions
Please see https://docs.realm.io/platform/self-hosted/installation for installation, upgrade and rollback instructions. 


# Release 3.9.17 (2018-08-24)

### Breaking changes
* None

### Bugs fixed
* None

### Enhancements
* None

### Installation & rollback instructions
Please see https://docs.realm.io/platform/self-hosted/installation for installation, upgrade and rollback instructions. 


# Release 3.10.0-alpha.2

### Bugs fixed
* None

### Enhancements
* When the server is configured for HTTPS, its internal components
  will communicate over HTTPS in both single-node and multi-node
  deployments.


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
