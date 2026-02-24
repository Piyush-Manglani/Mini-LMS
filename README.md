# Mini LMS App

A comprehensive Mini Learning Management System (LMS) mobile application built with React Native Expo. This application provides users with features like authentication, a course catalog, course bookmarks, profile statistics, and embedded course content viewing.

## 🚀 Setup Instructions

1. **Clone the repository** (if you haven't already).
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up Environment Variables**:
   Copy the example environment file and update it with your actual variables if needed:
   ```bash
   cp .env-example .env
   ```
4. **Start the development server**:
   ```bash
   npx expo start
   ```
   Open the app using Expo Go on your physical device, or use an iOS Simulator / Android Emulator.

## 🔑 Environment Variables Needed

The application relies on the following environment variables. They are defined in the `.env` file (see `.env-example` for the template):

- `EXPO_PUBLIC_API_URL`: The base URL for the backend API. Default fallback in the codebase is `https://api.freeapi.app/api/v1`.

## 🏗️ Key Architectural Decisions

- **Framework**: `Expo` (React Native) + `Expo Router` for file-based navigation.
- **Styling**: `NativeWind` (Tailwind CSS for React Native) for rapid, utility-first UI development.
- **State Management**: React `Context API` handles global states such as Authentication (`AuthContext`) and Bookmarks (`BookmarkContext`). Chosen over Redux for simplicity and reduced boilerplate for this app's scale.
- **Network Client**: `Axios` with configured interceptors for automatic token injection and structured error handling.
- **Secure Storage**: `Expo SecureStore` is utilized for securely storing sensitive tokens (access & refresh tokens), while general data uses standard `AsyncStorage`.
- **Form Handling & Validation**: Used `React Hook Form` combined with `Zod` resolvers for strict client-side form validation before API submission.
- **Type Safety**: The entire application is strictly typed using TypeScript, eliminating the usage of `any` for predictable API shapes and UI props.

## ⚠️ Known Issues / Limitations

- **Simulated Enrollment**: Real enrollment and payment gateways are currently mocked out. Enrollment simulates an API delay before transitioning the user.
- **Instructor Data**: The FreeAPI doesn't have a direct correlation between courses and instructors. The app currently maps random user data to courses cyclically.
- **Avatar Updates**: The "Update Photo" button on the profile screen is currently a placeholder.
- **Pagination**: The course catalog currently truncates API responses to the top 10 items instead of utilizing infinite pagination.

## 📸 Screenshots

| Login Screen | Course Catalog | Course Details | Profile Screen |
| :---: | :---: | :---: | :---: |
| <img src="https://drive.google.com/file/d/17AJXSq7suuHclcsCBNKuO5ACVPAzdwEM/view?usp=drive_link" width="200" /> | <img src="https://drive.google.com/file/d/1szbtxczSJm1rs6xO8RlrwIeeCMYeiy_5/view?usp=drive_link" width="200" /> | <img src="https://drive.google.com/file/d/1fd6bI2aJSYr0BRKlpzOJmijqywLHr0vs/view?usp=drive_link" width="200" /> | <img src="https://drive.google.com/file/d/1n1MI5CWkpMI0k3ejQsN77ZVW_sKQJNBZ/view?usp=drive_link" width="200" /> |

*(Replace the placeholder URLs above with actual hosted screenshot images before final deployment)*

---

To learn more about developing your project with Expo, look at the following resources:
- [Expo documentation](https://docs.expo.dev/)
- [React Native documentation](https://reactnative.dev/docs/getting-started)
