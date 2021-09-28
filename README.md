# RespublicaPwa30SecondsApp
30 Seconds Board Game AGOF DIGI JAM PWA

{
  "hosting": {
    "public": "my-app/build",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
        {
            "source": "**",
            "destination": "/index.html"
        }
    ]
  }
}
