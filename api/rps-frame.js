import { rando } from '@nastyox/rando.js';

export default async (req, context) => {
    const url = new URL(req.url);
    const preference = Number(url.searchParams.get('preference'));

    function getUserChoice() {
        let textToShow = "Select Rock, Paper or Scissor!";
        const randomNumber = rando(0, 2);

        if (preference === 0 && randomNumber === 0) {
            textToShow = "We Tied! I chose Rock as well!";
        }
        else if (preference === 1 && randomNumber === 1) {
            textToShow = "We Tied! I chose Paper as well!";
        }
        else if (preference === 2 && randomNumber === 2) {
            textToShow = "We Tied! I chose Scissors as well!";
        }
        else if (preference === 0 && randomNumber === 1) {
            textToShow = "You Lost! I chose Paper.";
        }
        else if (preference === 0 && randomNumber === 2) {
            textToShow = "You Won! I chose Scissors.";
        }
        else if (preference === 1 && randomNumber === 0) {
            textToShow = "You Won! I chose Rock.";
        }
        else if (preference === 1 && randomNumber === 2) {
            textToShow = "You Lost! I chose Scissors.";
        }
        else if (preference === 2 && randomNumber === 0) {
            textToShow = "You Lost! I chose Rock.";
        }
        else if (preference === 2 && randomNumber === 1) {
            textToShow = "You Won! I chose Paper.";
        }

        console.log({ textToShow })

        return textToShow;
    }

    const font = {
        file: 'Redaction-Regular.woff2',
        name: 'Redaction'
    };

    const html = `
        <html>
        <head>
        <style>
            @font-face {
                font-family: "${font.name}";
                src:
                    local("${font.name}"),
                    url("/fonts/${font.file}") format("woff2");
                }
            body {
                margin: 0;
                padding: 0;
            }
            fc-frame {
                font-family: "${font.name}";
                display: flex;
                width: 100vw;
                height: 100vh;
                color: white;
                background: black;
                align-items: center;
                justify-content: center;
                font-size: 5em;
                line-height: 1;
            }
        </style>
        </head>
        <body>
        <fc-frame>
            ${getUserChoice()}
        </fc-frame>
        </body>
    </html>
    `

    return new Response(html,
        {
            status: 200,
            headers: { 'Content-Type': 'text/html' },
        }
    );
}

export const config = {
    path: "/rps-frame"
};
