# Getting Started With Realm Object Server Enterprise

The quickest way to get started with ROS Enterprise is by using Docker.  Make sure you have at least version `17.09.0-ce`:

    $ docker version
    Client:
     Version:      17.09.0-ce
     API version:  1.32
     Go version:   go1.8.3
     Git commit:   afdb6d4
     Built:        Tue Sep 26 22:40:09 2017
     OS/Arch:      darwin/amd64

    Server:
     Version:      17.09.0-ce
     API version:  1.32 (minimum version 1.12)
     Go version:   go1.8.3
     Git commit:   afdb6d4
     Built:        Tue Sep 26 22:45:38 2017
     OS/Arch:      linux/amd64
     Experimental: false

If you haven't already done so, clone this repository:

    $ git clone https://github.com/realm/realm-mobile-platform.git
    $ cd realm-mobile-platform/getting-started-enterprise

In addition to Docker, you will need a feature token in order to use these Enterprise features.  For more information, please visit [https://realm.io/pricing/](https://realm.io/pricing/).

Once you have obtained a feature token, you need to set it in your environment:

    $ export FEATURE_TOKEN=<feature token data>

Next, from a local clone of this repository, use the `docker-compose` command to start ROS Enterprise:

    $ docker-compose up

You should see log output from several services in your console. ROS should now be accessible at `127.0.0.1:9080`. You can also access the Consul UI at [http://127.0.0.1:8500](http://127.0.0.1:8500).  Pressing `Ctrl-C` will stop all services and return you to the shell prompt.

### Inspecting your deployment

You can run the `docker-compose` stack in the background in order to simulate a highly-available installation:

    $ docker-compose up -d

After which, you can inspect the status of your services:

    $ docker-compose ps
               Name                            Command               State                                             Ports
    ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
    rosenterprise_auth_1              /usr/local/bin/ros-enterpr ...   Up      7800/tcp, 0.0.0.0:9080->9080/tcp
    rosenterprise_consul_1            docker-entrypoint.sh agent ...   Up      8300/tcp, 8301/tcp, 8301/udp, 8302/tcp, 8302/udp,0.0.0.0:8500->8500/tcp, 8600/tcp,
                                                                               8600/udp
    rosenterprise_swg_default_one_1   /usr/local/bin/ros-enterpr ...   Up      7800/tcp, 9080/tcp
    rosenterprise_swg_default_two_1   /usr/local/bin/ros-enterpr ...   Up      7800/tcp, 9080/tcp

You can also stream logs from all services:

    $ docker-compose logs -f

... or a specific service:

    $ docker-compose logs -f auth

If the deployment is running in the background, you can tear it down with:

    $ docker-compose down
    $ docker-compose down -v # to remove sync worker data

### Simulate failover

This deployment includes a single Sync Worker Group, comprised of three Sync Workers running in Replicated Mode.  When started, each of these services will assume a role based on election:  `master`, `slave`, and `spare`.  You can get the status of the group by using the Consul UI:

1. Navigate to the Consul UI: [http://127.0.0.1:8500](http://127.0.0.1:8500)

2. Click on "KEY/VALUE" in the navigation bar.

3.  Click on "sync-worker-group", then click on "default/", and then on "master".

4. The value on the right side is a JSON structure that indicates which node is master and which is slave.  It also indicates if the slave is complete.  When the slave is complete, the Sync Worker Group is operational and ready for a failover event.

Once you have made a determination of which service to terminate, you can do so by scaling it down:

    $ docker-compose up -d --no-recreate --scale swg_default_one=0

It may help to see what is going on during this process by streaming logs in another terminal:

    $ docker-compose logs -f

You can add the service back by scaling it back up to `1`:

    $ docker-compose up -d --no-recreate --scale swg_default_one=1

Caution: you should not scale these services beyond `1`, as they are stateful and use docker named volumes to store this state.

### Using a GUI

[Portainer](https://portainer.io) is a great way to manage your local docker installation and visualize deployments better.  It also provides some realtime performance graphs, logs and console access to containers.

To install it, simply run:

    $ docker run --name portainer -d -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock portainer/portainer -H unix:///var/run/docker.sock --no-auth

You can then access it at [http://127.0.0.1:9000](http://127.0.0.1:9000).

CAUTION: Do not run this configuration on production systems.  Portainer is run without requiring authentication simply for convenience.
