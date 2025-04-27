# Pickle Takehome Docs

### Auther: __Matt Vaccaro__   Completed At: __April 27th, 2025__
### [Portfolio](https://www.mattvaccaro.dev/)    [Linked In](https://www.linkedin.com/in/matthew-vaccaro/)

-----

# Demo Video
Quick loom to demo the project, talk about some fun aspects & help any familuarize themself with the project
## [📺 Loom](https://www.loom.com/share/01730d472d3b42b297d80df44f14c33b?sid=ced94ad4-2400-4106-ae40-c8f44e4c21c1)

## __Pre Req__
This app using Expo, so you'll need to ensure you have expo installed globaly or use `npx` before using an expo command

```
Possible issues you can run into

🚧 A common issue when starting an expo project is not having XCode configured or udpated __You should be on version Version 16.2 or above__ 🚧

🚧 Running the start command and hitting `i` will open a simulator. It's currently defaulted to __iPhone 16__. If you don't have that simulator, either add it or select a different simulator. 🚧

🔗 [How to add additional simualtors](https://developer.apple.com/documentation/safari-developer-tools/adding-additional-simulators)
```

## __Getting Setup__
1. Get those dependcies setup!
```
npm i
```

2. Start up the server
```
npm run start
```

3. Follow prompts to open the simmulator. i opens iOS
```
› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press j │ open debugger
› Press r │ reload app
› Press m │ toggle menu
› shift+m │ more tools
› Press o │ open project code in your editor
```

🔮 You can hit `r` in the terminal anytime to reload. ⚠️ Note: reloading will cause Zustand to lose state, so you will have to relogin in ⚠️

You can also clear expo cache at any time by using
```
npx expo start --clear
```

## Stack
- Expo + Expo Routing
- Zustand (Global Static State)
- TanStack Query (Async State)
- Reanatimed 3 (Aniamtion)

## Project Structure
✨ Expo uses folder structre router ✨

Root of the project is the outer most `_layout.tsx`. The majority of the screens are in the `(tabs)` folder. These contain subfolders to ensure the nav bar remains visable through the application!

Share is a dir for components that are spread through the application. Unique components (if there were any) would be kept in a _components_ folder in the route folder.

Lastly API contains an axios instance & two files (users / products). These are axios request and TanStack Query functions. This is to keep query and mutation logic seperate from the views.
