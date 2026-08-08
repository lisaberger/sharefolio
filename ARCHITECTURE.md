This will give you a basic overview over the architecture behind the project.

### Layered Architecture ###

For this project, we decided for a layered architecture to ensure the independence of the user interface from the API.
The advantage of this approach is that, in addition to separating responsibilities, it also allows us to develop the
front end in parallel with the API.
This makes our architecture clean and scalable.  
The idea behind here is that every layer has its own responsiblities and also not every layer can talk with each other.
Instead there are restrictions which encapsulate the layers in logic.

**UI:** This layer should contain all UI elements such as pages, componenents etc. - when requesting data, it should
request the repositories to use from the config layer
**Core:** This layer provides all core structures used in the application, such as application types, data models and
api interfaces
**Config:** This layer defines which api to use - so if UI asks to get user data the config layer will define which api
to ask for the user-repository to serve it
**API:** This layer is responsible to make the requests to the backend and provide the data

```

        ┌───────┐
        │  UI   │
        └───────┘
     ┌──────┴──────┐
     │             │
┌────▼─────┐   ┌───▼─────┐
│   Core   ◄───│ Config  │
└────▲─────┘   └───▲─────┘
     │             │
     └──────┬──────┴──────┐
            │             │
        ┌───▼───┐     ┌───▼───┐
        │  API1 │     │  API2 │
        └───────┘     └───────┘

```

- ✅ UI -> Core
- ✅ UI -> Config
- ✅ Config -> Core
- ✅ API -> Core
- ✅ API -> Config
- ❌ UI ↔ API (must never connect)

### Structure ###

The folder structure should follow certain rules:

- Each Layer has its own subfolder - those subfolders will be featurebased
- Use barrel files inside of the layers to make exporting and importing easy to read
- Make sure to not use imports that are against the layer architecture explained above

Example folder structure

```
src
├── core
│   ├── user
│   └── common
├── config
│   └── user-config -> tells which repository to use
├── api1
│   ├── repositories
│   │   └── user-repository
│   └── common
├── api2
│   ├── repositories
│   │   └── user-repository
│   └── common
└── ui
    ├── user
    │   └── components
    │           └── personal-information.vue
    └── common
```
