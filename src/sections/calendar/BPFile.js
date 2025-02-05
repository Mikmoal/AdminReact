<GoogleOAuthProvider clientId="3ntent.com">
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth="xl">
            <Grid container spacing={3}>
              <Grid xs={12} md={6} lg={2}>
                {/* <AccordionJuntas/> */}
                <CalendarList />
              </Grid>
              <Grid xs={12} md={12} lg={10}>
                <Calendar />
              </Grid>

              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </Grid>
          </Container>
        </Box>
      </GoogleOAuthProvider>;