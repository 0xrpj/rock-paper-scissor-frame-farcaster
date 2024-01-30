export default async (req, context) => {
    const host = process.env.URL;

    let buttonIndex = 0;

    try {
        const body = await new Response(req.body).json();
        buttonIndex = body.untrustedData.buttonIndex;
    } catch (e) { }

    //hacky way to disable netlify caching behaviours! PR are welcome!
    function generateRandomString() {
        let result = '';
        const characters = '0123456789abcdefghijklmnopqrstuvwxyz';
        const charactersLength = characters.length;

        for (let i = 0; i < 500; i++) {
            const randomIndex = Math.floor(Math.random() * charactersLength);
            result += characters.charAt(randomIndex);
        }

        return result;
    }

    const imagePath = `${host}/rps-image?preference=${parseInt(buttonIndex - 1)}&randomStr=${generateRandomString()}`;

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
