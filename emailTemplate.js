export const emailTemplate = (name, link) => {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
        crossorigin="anonymous"
      />
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"
      ></script>
  
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
        rel="stylesheet"
      />
  
      <style>
        body {
          background-color: white;
        }
      </style>
      <title>Email</title>
    </head>
    <body>
      <div>
        <div class="container shadow-lg p-4">
          <h1 style="font-weight: 100">Hello, ${name}</h1>
          <div class="mt-4">
            <h4 style="font-weight: 400">
              Your vendor account has been created and a token was sent to this
              email address.
            </h4>
            <div class="text-center mt-4">
              <a href="${link}" class="btn btn-success"
                >CLICK THIS LINK TO VERIFY YOUR ACCOUNT</a
              >
            </div>
          </div>
          <hr />
          <div class="mt-3 text-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/BMW_logo_%28gray%29.svg/1200px-BMW_logo_%28gray%29.svg.png"
              alt="logo"
              srcset=""
              style="height: 130px; width: 130px"
              class="me-2"
            />
            <div class="h3 text-black-50 mt-3">BMW-NAIJA</div>
          </div>
        </div>
      </div>
    </body>
  </html>
  `;
};
