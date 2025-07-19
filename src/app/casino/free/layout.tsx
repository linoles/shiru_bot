export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-hidden overflow-x-hidden overflow-y-hidden">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <script src="https://telegram.org/js/telegram-web-app.js?58"></script>
      </head>
      <body className="m-0 overflow-hidden overflow-x-hidden overflow-y-hidden">
        {children}
      </body>
    </html>
  );
}