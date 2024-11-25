#include <Arduino.h>
#include <WiFi.h>        // Include Wi-Fi library
#include <WebServer.h>    // Include WebServer library for HTTP server

// Wi-Fi credentials
const char* ssid = "scit";
const char* password = "12345678";

// Relay pin
#define RELAY_PIN 15 // Pin connected to the relay module

// Global counter for logging results
int counter = 0;

// Wi-Fi connection status
bool isWiFiConnected = false;

// Variable to keep track of relay state
bool isRelayOn = false;

// Create WebServer object on port 80
WebServer server(80);

// Function to connect to Wi-Fi
void connectToWiFi() {
  Serial.printf("Connecting to Wi-Fi network: %s\n", ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println("\nWi-Fi connected!");
  Serial.printf("IP Address: %s\n", WiFi.localIP().toString().c_str());
  isWiFiConnected = true;
}

// Define the relay control routes
void handleRelayOn() {
  digitalWrite(RELAY_PIN, HIGH);
  isRelayOn = true;  // Update relay status
  Serial.println("Relay turned ON");
  server.send(200, "text/plain", "Relay is ON");
}

void handleRelayOff() {
  digitalWrite(RELAY_PIN, LOW);
  isRelayOn = false; // Update relay status
  Serial.println("Relay turned OFF");
  server.send(200, "text/plain", "Relay is OFF");
}

// Handle online status check route
void handleOnlineStatus() {
  if (isWiFiConnected) {
    server.send(200, "text/plain", "Device is online");
  } else {
    server.send(500, "text/plain", "Device is offline");
  }
}

// Handle relay status check route
void handleRelayStatus() {
  if (isRelayOn) {
    server.send(200, "text/plain", "Relay is ON");
  } else {
    server.send(200, "text/plain", "Relay is OFF");
  }
}

void setup() {
  // Start Serial communication
  Serial.begin(9600);
  delay(1000);
  Serial.println("Initializing...");

  // Connect to Wi-Fi
  connectToWiFi();

  // Set relay pin as output and turn it off initially
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW);

  // Start the HTTP server and define routes
  server.on("/relay/on", HTTP_GET, handleRelayOn);    // Command to turn on the relay
  server.on("/relay/off", HTTP_GET, handleRelayOff);   // Command to turn off the relay
  server.on("/status", HTTP_GET, handleOnlineStatus);  // Route to check online status
  server.on("/relay/status", HTTP_GET, handleRelayStatus);  // Route to check relay status

  // Start the server
  server.begin();
  Serial.println("HTTP server started.");
}

void loop() {
  // Increment counter and log the result every 2 seconds
  counter++;
  String message = "Counter: " + String(counter);
  Serial.println(message);

  // Check if Wi-Fi is connected
  if (isWiFiConnected) {
    Serial.println("Wi-Fi is connected.");
  } else {
    // Try reconnecting if Wi-Fi is not connected
    connectToWiFi();
  }

  // Handle HTTP requests
  server.handleClient();

  // Add a delay
  delay(2000); // Log every 2 seconds
}
