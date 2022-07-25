const GoogleOAuth = () => {
    /* global google */
    window.google.accounts.id.initialize({
        client_id:
        "13357961386-lbtgvvpinvij8evpp565tlh7qvrp5uuf.apps.googleusercontent.com",
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