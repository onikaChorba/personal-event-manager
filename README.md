#  🗓️ Personal Event Management Application

Welcome to the Personal Event Management Application, a comprehensive **React-based** project designed to help users effectively manage their events. This application allows users to add, edit, delete, and sort events while providing advanced features such as filtering, pagination, and event status management. Built with modern web technologies, it ensures a seamless user experience with an intuitive interface and robust functionality.

## 🛠️ Used Methods and Tools

### ⛳ Event Model
The application uses a clear event model with the following fields:
- **ID** (number): Unique identifier for each event.
- **Name** (string): The title or name of the event.
- **Description** (string): Brief details about the event.
- **Category** (enum): Events are categorized as either "work", "personal", or "leisure".
- **Date** (Date): The scheduled date of the event.
- **Status** (enum): The event can be marked as "upcoming", "completed", or "cancelled".

### 🎯 Features

- **Add Event**: Users can easily add new events through a clean and intuitive form. ✏️
- **Edit Event**: Events can be updated with any changes to the name, description, category, or date. ✍️
- **Delete Event**: Users can remove events they no longer need, simplifying event management. ❌
- **Sorting**: Events can be sorted by name, date, or category, allowing for better organization. 📊
- **Filtering**: Filter events by category (work, personal, leisure) or by status (upcoming, completed, cancelled) to view only relevant events. 🔍
- **Pagination**: To handle large numbers of events, the application supports pagination using React Table, making event navigation easier. 📑
- **Event Completion**: Users can mark events as completed, making it simple to track progress. ✅

### 🧪 Form Validation
Form validation is implemented using Yup, ensuring that:
- The event name is required.
- The event date must be in the future, preventing past dates from being selected.

### 💻 UI/UX Design
- **Responsive Design:** Built with **Tailwind CSS**, the application features a clean and responsive user interface that adapts seamlessly to any screen size.
- **Event Table:** Events are displayed in a table format, with columns for name, description, category, date, and status, providing users with an organized and easy-to-read view.
- **User-Friendly** Forms: Adding and editing events is made simple with easy-to-use forms and real-time validation feedback.

The application is designed to be responsive, ensuring that users on different devices (mobile, tablet, desktop) have a smooth and consistent experience.

### 🚀 Bonus Features
- **Custom Hooks:** Implement custom hooks for managing event states and API requests, promoting clean and reusable logic.
- **Event Details Modal:** When users click on an event, a modal appears displaying detailed event information for a better user experience.
- **Search Functionality:** A search bar allows users to quickly find events by name, enhancing usability for large event lists.

### 🔥 Deployment
This project has been deployed on GitHub Pages, allowing users to access their personal event management system from anywhere with an internet connection.
