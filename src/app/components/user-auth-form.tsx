async function onSubmit(event: React.SyntheticEvent) {
  event.preventDefault();
  setIsLoading(true);
  if (!isLogin) {
    try {
      // 新規ユーザ登録処理
      const { data, error } = await authClient.signUp.email(
        {
          email,
          password,
          name: email.split("@")[0],
        },
        {
          onRequest: () => {
            setIsLoading(true);
          },
          onSuccess: () => {
            router.push("/dashboard");
          },
          onError: (ctx) => {
            alert(ctx.error.message);
          },
        }
      );
    } finally {
      setIsLoading(false);
    }
  } else {
    try {
      // ユーザーネームとパスワードでログイン処理
      const { data, error } = await authClient.signIn.email(
        {
          email,
          password,
        },
        {
          onRequest: () => {
            setIsLoading(true);
          },

          onSuccess: () => {
            router.push("/dashboard");
          },
          onError: (ctx) => {
            alert(ctx.error.message);
          },
        }
      );
    } finally {
      setIsLoading(false);
    }
  }
}

async function handleGoogleSignIn() {
  // Google oauth
  try {
    setIsLoading(true);
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  } catch (error) {
    console.error(error);
    alert("Failed to sign in with Google");
  } finally {
    setIsLoading(false);
  }
}
