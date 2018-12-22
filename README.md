# SchoolWeb
Simple .Net Core (Web API) and Angular 7 demonstration of a School Web App Using NHibernate with Fluent API, SQLite, Angular Material and more!

## Motivation
There is not much demonstrations of a full project using .Net Core and Angular out there, so I decided to create one.
The project is vs-code ready, so you can just clone the repo, install dependencies, open vs-code and hit F5 to debug.

## Getting Started
First you need to have some dependencies installed.

if you are on ubuntu, install the .Net Core by entering below commands, otherwise check out [Microsoft Instructions](https://dotnet.microsoft.com/download).

```shel
# For Ubuntu 18.04:
wget -q https://packages.microsoft.com/config/ubuntu/18.04/packages-microsoft-prod.deb

# For Ubuntu 16.04
wget -q https://packages.microsoft.com/config/ubuntu/16.04/packages-microsoft-prod.deb

sudo dpkg -i packages-microsoft-prod.deb

sudo add-apt-repository universe
sudo apt-get install apt-transport-https
sudo apt-get update
sudo apt-get install dotnet-sdk-2.2
```

Install node and npm if you don't have them already:
```shell
sudo apt update
sudo apt install nodejs npm

# check if it's installed correctly
nodejs --version

```

Install the Angular CLI
```shell
npm install -g @angular/cli
```

### Clone the repo
```shell
git clone git@github.com:Arman92/SchoolWeb.git

# Restore the NuGet packages
dotnet restore
# Install the node modules dependencies (may took a while)
cd web && npm install
```

## Run 
You can run the project with VSCode or by dotnet core and then http://localhost:5000 in your browser
```shell
dotnet run
```

## Tests
For running Angular tests:
```shell
cd web 
ng test
```

