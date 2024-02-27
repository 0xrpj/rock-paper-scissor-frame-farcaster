export default async function getCastInfo(messageBytes) {
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            api_key: process.env.NEYNAR_API_KEY,
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            cast_reaction_context: true,
            follow_context: false,
            message_bytes_in_hex: messageBytes
        })
    };

    const neynarResponse = await (await fetch('https://api.neynar.com/v2/farcaster/frame/validate', options)).json()

    const allConnectedAddresses = neynarResponse.action.interactor.verifications;
    if (allConnectedAddresses.length === 0) {
        throw new Error("ACCOUNT_NOT_CONNECTED");
    }

    return {
        address: allConnectedAddresses[0], message: {
            buttonIndex: neynarResponse.action.tapped_button.index
        }
    };
}