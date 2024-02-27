import { rando } from '@nastyox/rando.js';
import { StackClient } from "@stackso/js-core";
import font from "../utils/getFont"

const stack = new StackClient({
    apiKey: process.env.STACK_CLIENT_API_KEY
});

export default async (req, context) => {
    const url = new URL(req.url);
    const preference = Number(url.searchParams.get('preference'));
    const address = url.searchParams.get('address');

    async function getUserChoice() {
        let textToShow = "Select Rock, Paper or Scissor!";
        const randomNumber = rando(0, 2);
        let didWin = false;
        let didDraw = false;
        let didLose = false;

        if (preference === 0 && randomNumber === 0) {
            didDraw = true;
            textToShow = "We Tied! I chose Rock as well!";
        }
        else if (preference === 1 && randomNumber === 1) {
            didDraw = true;
            textToShow = "We Tied! I chose Paper as well!";
        }
        else if (preference === 2 && randomNumber === 2) {
            didDraw = true;
            textToShow = "We Tied! I chose Scissors as well!";
        }
        else if (preference === 0 && randomNumber === 1) {
            didLose = true;
            textToShow = "You Lost! I chose Paper.";
        }
        else if (preference === 0 && randomNumber === 2) {
            didWin = true;
            textToShow = "You Won! I chose Scissors.";
        }
        else if (preference === 1 && randomNumber === 0) {
            didWin = true;
            textToShow = "You Won! I chose Rock.";
        }
        else if (preference === 1 && randomNumber === 2) {
            didLose = true;
            textToShow = "You Lost! I chose Scissors.";
        }
        else if (preference === 2 && randomNumber === 0) {
            didLose = true;
            textToShow = "You Lost! I chose Rock.";
        }
        else if (preference === 2 && randomNumber === 1) {
            didWin = true;
            textToShow = "You Won! I chose Paper.";
        }

        if (address) {
            if (didWin) {
                stack.track("Win", {
                    account: address,
                })
            } else if (didDraw) {
                stack.track("Draw", {
                    account: address,
                })
            } else {
                stack.track("Lose", {
                    account: address,
                })
            }
        }

        return textToShow;
    }

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
            ${await getUserChoice()}
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
