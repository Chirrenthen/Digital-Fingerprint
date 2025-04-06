document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const infoDiv = document.getElementById("info");

  // Screen Resolution
  document.getElementById("resolution").textContent = `${window.screen.width}x${window.screen.height}`;

  // Browser Information
  const browser = navigator.userAgentData?.brands?.[0]?.brand || navigator.userAgent;
  document.getElementById("browser").textContent = browser;

  // Installed Plugins
  const plugins = navigator.plugins;
  document.getElementById("plugins").textContent = Array.from(plugins).map(p => p.name).join(", ");

  // OS
  const os = navigator.userAgentData?.platform || navigator.platform;
  document.getElementById("os").textContent = os;

  // Fetch IP and Location
  fetch("https://ipapi.co/json/")
    .then(response => response.json())
    .then(data => {
      document.getElementById("ip").textContent = data.ip;
      document.getElementById("city").textContent = data.city;
      document.getElementById("region").textContent = data.region;
      document.getElementById("country").textContent = data.country_name;
      document.getElementById("postal").textContent = data.postal;
      document.getElementById("isp").textContent = data.org;
      document.getElementById("timezone").textContent = data.timezone;
      document.getElementById("coordinates").href = `https://www.google.com/maps?q=${data.latitude},${data.longitude}`;

      // Create formatted text file
      const fileContent = `
===================================================
               DEVICE INFORMATION REPORT
===================================================

1. NETWORK DETAILS
---------------------------------------------------
IP Address          : ${data.ip}
City                : ${data.city}
Region              : ${data.region}
Country             : ${data.country_name}
Postal Code         : ${data.postal}
Internet Provider   : ${data.org}
Time zone           : ${data.timezone}
Google Maps Link    : "https://www.google.com/maps?q=${data.latitude},${data.longitude}"

2. DEVICE DETAILS
---------------------------------------------------
Browser             : ${browser}
Operating System    : ${os}
CPU Architecture    : ${cpu}
Screen Resolution   : ${window.screen.width}x${window.screen.height}

3. INSTALLED PLUGINS
---------------------------------------------------
${Array.from(plugins).map(p => p.name).join(", ")}

===================================================
            REPORT GENERATED AUTOMATICALLY
===================================================
      `.trim();

      const blob = new Blob([fileContent], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'device_info.txt';
      link.click();

      loader.classList.add("hidden");
      infoDiv.classList.remove("hidden");
    })
    .catch(error => {
      console.error("Error fetching IP details:", error);
    });
});
