const GoogleOAuth = () => {
    /* global google */
    window.google.accounts.id.initialize({
        client_id:
        "53293187080-1of7nrcd2f6dqil7b4qo59hjlkvu333e.apps.googleusercontent.com",
        callback: handleCallbackResponse,
    });

    window.google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        {
            theme: "outline",
            size: "large",
        }
    );
}

export default GoogleOAuth;