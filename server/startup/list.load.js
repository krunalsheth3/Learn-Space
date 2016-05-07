Meteor.startup(function() {
  if(List.find().count() === 0) {
    

    HTTP.call( 'GET',
         'http://sandbox.graph.hmhco.com/v4/developer', 
         {headers:{
              "Accept":"application/json",
              "Content-Type":"application/json",
              "Authorization":"SIF_HMACSHA256 ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBjM01pT2lKb2RIUndjem92TDJsa1pXNTBhWFI1TG1Gd2FTNW9iV2hqYnk1amIyMGlMQ0poZFdRaU9pSm9kSFJ3T2k4dmQzZDNMbWh0YUdOdkxtTnZiU0lzSW1saGRDSTZNVFEyTWpZME5ESXdOU3dpYzNWaUlqb2lZMjVjZFRBd00yUkhZVzVrWVd4bUlFZHlaWGtzZFdsa1hIVXdNRE5rWjJGdVpHRnNaaXgxYm1seGRXVkpaR1Z1ZEdsbWFXVnlYSFV3TUROa1lXSXhaRFF5TXpjdFpXUmtOeTAwWldSa0xUa3pOR1l0TXpRNE5tVmhZelZqTWpZeUxHOWNkVEF3TTJReE1EQXlPRGcxTUN4a1kxeDFNREF6WkRjME56Y2lMQ0pvZEhSd09pOHZkM2QzTG1sdGMyZHNiMkpoYkM1dmNtY3ZhVzF6Y0hWeWJDOXNhWE12ZGpFdmRtOWpZV0l2Y0dWeWMyOXVJanBiSWtsdWMzUnlkV04wYjNJaVhTd2lZMnhwWlc1MFgybGtJam9pWVRaa05qWXpOVEF0T1dNeU5TMDBOV05qTFRreVl6Y3RaRFkzTkdGa09UUTVObVl4TG1odGFHTnZMbU52YlNJc0ltVjRjQ0k2TVRRMk1qY3pNRFl3TlgwLjlFZmlMdWI1RmlBUkMyS2dXaC1uZ3B5Q1loRHd4UU9DM3J4OS1tSFhoOHM6OHljZTI4WHduN1FiRlFpVFZhMEJHdVBrdjZWVVBCR25SWTFzWXg5NlE2TT0K",
              "Vnd-HMH-Api-Key":"558063932b65c556ebd5676e45a0b8cd"
            }
          },
           function( error, response ) {
              console.log(response);
           }
    );

  // list.forEach(function(list) {
  //     List.insert(list);
  //   });
    
  }
});