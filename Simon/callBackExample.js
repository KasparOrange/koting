// This is a function that makes an API request
function fetchUserData(userId, callback) {
  // Simulate an API call that takes time
  console.log("Fetching user data...");
  
  // In a real app, this would be an actual API call
  setTimeout(() => {
    // Once we have the data (after 2 seconds in this example)
    const userData = {
      id: userId,
      name: "Jane Doe",
      email: "jane@example.com"
    };
    
    // We call the callback function and pass the data
    callback(userData);
  }, 2000);
}

setTimeout(() => {
  console.log("This line runs after 2 seconds!");
}, 2000);

// This is our callback function
function displayUserInfo(user) {
  console.log("User data received!");
  console.log(`Name: ${user.name}`);
  console.log(`Email: ${user.email}`);
}

// We call fetchUserData and pass displayUserInfo as a callback
fetchUserData(123, displayUserInfo);

console.log("This line runs while the data is still being fetched!");