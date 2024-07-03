// src/UserProfile.js
import React, { useEffect, useState } from 'react';
import supabase from './supabaseClient';
import { Container, Box, Typography, Avatar, Card, CardContent, Grid, CircularProgress, Stack, Divider } from '@mui/joy';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('user')
          .select('*')
          .eq('userid', userId)
          .single();

        if (error) {
          console.error('Error fetching user profile:', error);
        } else {
          setUser(data);
        }
      } catch (err) {
        console.error("Fetch user profile error:", err);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (!user) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card sx={{ mb: 4, p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ width: 100, height: 100, mr: 4 }}>
            {user.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h4" gutterBottom>
              {user.name}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Email: {user.email}
            </Typography>
          </Box>
        </Box>
      </Card>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Account Details
              </Typography>
              <Typography variant="body1" gutterBottom>
                Password: ********
              </Typography>
              <Typography variant="body1" gutterBottom>
                Payment Info: {JSON.stringify(user.paymentinfo)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Parking History
              </Typography>
              {user.parkingHistory && user.parkingHistory.length > 0 ? (
                user.parkingHistory.map((entry, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="body2">
                      {`Parking Lot: ${entry.parkingLotName}, Space: ${entry.spaceId}, Time: ${entry.time}`}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body2">
                  No parking history available.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile;
