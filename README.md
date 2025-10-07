# Frontend Mentor - Weather app solution

This is a solution to the [Weather app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshots](#screenshots)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- Search for weather information by entering a location in the search bar
- View current weather conditions including temperature, weather icon, and location details
- See additional weather metrics like "feels like" temperature, humidity percentage, wind speed, and precipitation amounts
- Browse a 7-day weather forecast with daily high/low temperatures and weather icons
- View an hourly forecast showing temperature changes throughout the day
- Switch between different days of the week using the day selector in the hourly forecast section
- Toggle between Imperial and Metric measurement units via the units dropdown
- Switch between specific temperature units (Celsius and Fahrenheit) and measurement units for wind speed (km/h and mph) and precipitation (millimeters) via the units dropdown
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshots

![Desktop Screenshot of the weather app](/public/desktop-screenshot.png)
![Tablet Screenshot of the weather app](/public/tablet-screenshot.png)
![Mobile Screenshot of the weather app](/public/mobile-screenshot.png)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Typescript](https://www.typescriptlang.org/) - For type syntax
- [ESLint](https://eslint.org/) - For static linter
- [Vite](https://vide.dev/) - Bundler
- [Tailwind CSS](https://tailwindcss.com/) - For Styles
- [ShadCN](https://ui.shadcn.com/) - Reusable components
- [Tanstack Router](https://tanstack.com/router/latest) - For routing
- [Tanstack Query](https://tanstack.com/query/latest) - For API calls

### What I learned

I'm absolutely not used to Tanstack Router, I usually usually work with React router, so it was amazing to use such a beautifull library. The loading / error management, is really wonderfull with this tool thanks to all the TS generated from the routes themselves.

### Continued development

- As I'm pretty new to Tanstack Router, I'm pretty sure both loading and error management could be improved
- We could go further by adding light / dark theme, translations
- I'm pretty sure hover / active states could be handled with more grace
- There are some points I didn't fully understand reading the Figma / README, such as how exactly is the unit picker supposed to work, or some edge cases with loading / disabled states, so I think a bit more of studies could be done here
- As I only had 1.5 day to do this in the hackathon context, I didn't add any test, but it should be really easy to write some tests using react testing library with vitest and MSW to mock the API
- It would have been cool to use `navigator.geolocation.getCurrentPosition` to automatically redirect to the user current city, if allowed, on the first browse instead of using Berlin as a fallback

## Author

- Website - [Jason Savelli](https://jasonsavelli.fr)
- Frontend Mentor - [@Newpoki](https://www.frontendmentor.io/profile/newpoki)
- GitHub - [@Newpoki](https://github.com/Newpoki)
