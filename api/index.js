export default async (req, context) => {
    const host = process.env.URL;

    const body = await new Response(req.body).json();
    const buttonIndex = body.untrustedData.buttonIndex;

   
    // Update imagePath based on the new preference value
    const imagePath = `${host}/rps-image?preference=${parseInt(buttonIndex)}`;

    const html = `
        <!doctype html>
        <body>
        <head>
        <style>
            figure {
                display: inline-block;
                margin: 0;
                max-width: 100%;
            }
            img {
                max-width: 100%;
                border: 4px inset black;
            }
        </style>
        <meta property="og:image" content="${imagePath}" />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${imagePath}" />
        <meta property="fc:frame:button:1" content="Rock" />
        <meta property="fc:frame:button:2" content="Paper" />
        <meta property="fc:frame:button:3" content="Scissor" />
        <title>Play Rock, Paper, Scissors!</title>
        </head>
            <h1>Play Rock, Paper, Scissors!</h1>
            <figure>
            <img width="600" src="${imagePath}" />
            </figure>
            <!-- Form for POST request -->
            <form action="/" method="POST">
                <input type="submit" value=":)" />
            </form>
        </body>
        </html>
    `;

    return new Response(html, {
        status: 200,
        headers: { 'Content-Type': 'text/html' },
    });
};

export const config = {
    path: "/",
};
