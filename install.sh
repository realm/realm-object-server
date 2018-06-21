#!/usr/bin/env bash
{ # evaluate this block in a stream
info() { echo "👉   $@"; }
warn() { echo "🚨   $@"; }
die() {
    echo "💣💥   $@"
    echo ""
    echo "Please check ros-install.log for more details."
    exit 1
}

user_id=$(id -u)
if [ "${user_id}" = "0" ]; then
    warn "Attempting to install as root, which is usually unnecessary. For security reasons, it is not recommended to install or run Realm Object Server as root."
    if [ "${SKIP_PROMPT}" = "" ]; then
        read -p "Are you sure you would like to continue as root? (y/N): " -n 1 -r
        echo ""
        case "${REPLY}" in 
            y|Y ) warn "Installing Realm Object Server as root...";;
            n|N ) exit 1;;
            * ) exit 1;;
        esac
        # #echo    # (optional) move to a new line
        # if [ $REPLY =~ ^[Yy]$ ]; then
        #     exit 1
        # fi
    fi
    export NPM_CONFIG_UNSAFE_PERM=true
else
    info "Installing Realm Object Server..."
fi


# TODO: check architecture and other prerequisites here.
platform=$(uname)
if [ "${platform}" = "Linux" ]; then
    arch=$(uname -p)
    if [ "${arch}" != "x86_64" ]; then
        die "Detected unsupported CPU architecture: ${arch}.  Only x86_64 is supported on Linux."
    fi
fi

if [ "$NVM_DIR" = "" ]; then
    nvm_url="https://raw.githubusercontent.com/creationix/nvm/v0.33.4/install.sh"
    warn "NVM was not found. Installing from ${nvm_url}..."
    (curl -s -o- "${nvm_url}" | bash) > ros-install.log 2>&1 || die "Could not install nvm."
    export NVM_DIR="$HOME/.nvm"
    nvm_installed=1
fi

if [ -s "$NVM_DIR/nvm.sh" ]; then
    nvm_sh="$NVM_DIR/nvm.sh"  # This loads nvm
elif [ "${platform}" = "Darwin" ]; then
    # there is a possibility that NVM was installed by homebrew...
    brew_prefix=$(brew --prefix nvm 2>/dev/null || true)
    if [ "${brew_prefix}" != "" ]; then
        nvm_sh="${brew_prefix}/nvm.sh"
    fi
fi

[ -s "${nvm_sh}" ] || die "You have $NVM_DIR defined, but I could not find nvm.sh!"

. "${nvm_sh}" || die "Could not load nvm!"  # This loads nvm

info "Installing/Using NodeJS LTS..."
nvm install lts/* > ros-install.log 2>&1 || die "Could not install NodeJS."

node_version=$(nvm current)
info "Using Node.js ${node_version}"

info "Upgrading npm..."
npm install -g npm > ros-install.log 2>&1 || die "Could not upgrade npm."

PACKAGE=${PACKAGE:-realm-object-server}
info "Installing ${PACKAGE}..."
npm install -g "${PACKAGE}" > ros-install.log 2>&1 || die "Could not install ${PACKAGE}."

cat - <<-EOD

🎉    Realm Object Server is now installed!

When using Realm Object Server, remember to load the proper Node.js version
into your shell:

    nvm use ${node_version}

Here are some quick-start commands:

    ros start            # Start ROS with defaults
    ros init my-ros      # Initialize a new custom ROS project
    ros help             # Print usage information

EOD

if [ "${nvm_installed}" = "1" ]; then
    cat - <<-EOD
!!!! NOTICE !!!!

We have installed NVM, The NodeJS Version Manager for you. In order to continue, you will
need to inject NVM into your current shell.  You do so by running:

    export NVM_DIR="$HOME/.nvm"
    . "$NVM_DIR/nvm.sh"  # This loads nvm

Enjoy! 
EOD
fi
}
