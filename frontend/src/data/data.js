export const initialData = {
  statuses: [
    { id: 1, name: 'Idea' },
    { id: 2, name: 'Demo' },
    { id: 3, name: 'In Progress' },
    { id: 4, name: 'Completed' },
    { id: 5, name: 'Released' }
  ],
  
  artists: [
    { id: 1, name: 'Beautifuls Dream' },
    { id: 2, name: 'Dare County' }
  ],
  
  tags: [
    { id: 1, name: 'Hip-Hop' },
    { id: 2, name: 'EDM' },
    { id: 3, name: 'Country' },
    { id: 4, name: 'Pop-Punk' },
    { id: 5, name: 'Trap' },
    { id: 6, name: 'Drill' },
    { id: 7, name: 'AI' },
    { id: 8, name: 'Pop' },
    { id: 9, name: 'Emo' },
    { id: 10, name: 'Alternative' },
    { id: 11, name: 'Chiptune' },
    { id: 12, name: 'K-Pop' },
    { id: 13, name: 'Sitcom' },
    { id: 14, name: 'Festival' },
    { id: 15, name: 'Prog-House' },
    { id: 16, name: 'Synth-Pop' },
    { id: 17, name: '80s' },
    { id: 18, name: 'DnB' },
    { id: 19, name: 'Dubstep' },
    { id: 20, name: 'Synthwave' },
    { id: 21, name: 'Minor' },
    { id: 22, name: 'Bittersweet' },
    { id: 23, name: 'Hardcore' }
  ],
  
  tracks: [
    {
      id: 1,
      title: 'Lettuce Guess',
      artist_id: 1,
      status_id: 5,
      artist: { name: 'Beautifuls Dream' },
      status: { name: 'Released' },
      tags: [
        { id: 1, name: 'Hip-Hop' },
        { id: 5, name: 'Trap' },
        { id: 6, name: 'Drill' },
        { id: 7, name: 'AI' },
        { id: 9, name: 'Emo' }
      ],
      links: [
        { id: 1, link_type: 'Songtrust', link_url: 'https://ascap.com' },
        { id: 2, link_type: 'Spotify', link_url: 'https://open.spotify.com/track/059dCf6zMaN5qSdmgRfzBM?si=5a681fd00ae64cab' },
        { id: 3, link_type: 'YouTube', link_url: 'https://www.youtube.com/watch?v=4JTjiuDU-6g' }
      ]
    },
    {
      id: 2,
      title: 'Teeth Meet Brush',
      artist_id: 1,
      status_id: 4,
      artist: { name: 'Beautifuls Dream' },
      status: { name: 'Completed' },
      tags: [
        { id: 1, name: 'Hip-Hop' },
        { id: 7, name: 'AI' },
        { id: 8, name: 'Pop' },
        { id: 10, name: 'Alternative' }
      ],
      links: [
        { id: 4, link_type: 'YouTube', link_url: 'https://www.youtube.com/watch?v=WYSr56224J0' },
        { id: 5, link_type: 'Songtrust', link_url: 'https://ascap.com' }
      ]
    },
    {
      id: 3,
      title: 'Domino',
      artist_id: 2,
      status_id: 5,
      artist: { name: 'Dare County' },
      status: { name: 'Released' },
      tags: [
        { id: 7, name: 'Trance' },
        { id: 11, name: 'EDM' },
        { id: 12, name: 'Emo' }
      ],
      links: [
        { id: 21, link_type: 'Spotify', link_url: 'https://open.spotify.com/track/1jfS8G3pp0dnoet5Y9aiaR?si=059faf4b71454742' },
        { id: 25, link_type: 'YouTube', link_url: 'https://www.youtube.com/watch?v=FKuabcqDfA4' }
      ]
    },
    {
      id: 4,
      title: 'Loud Road',
      artist_id: 1,
      status_id: 2,
      artist: { name: 'Beautifuls Dream' },
      status: { name: 'Demo' },
      tags: [
        { id: 4, name: 'Country' },
        { id: 7, name: 'AI' }
      ],
      links: [
        { id: 26, link_type: 'YouTube', link_url: 'https://youtu.be/uvhOh3BFZqs' }
      ]
    },
    {
      id: 5,
      title: 'Alive',
      artist_id: 2,
      status_id: 5,
      artist: { name: 'Dare County' },
      status: { name: 'Released' },
      tags: [
        { id: 7, name: 'EDM' },
        { id: 8, name: 'Indie' }
      ],
      links: [
        { id: 28, link_type: 'Spotify', link_url: 'https://open.spotify.com/track/18ieMMbHO0ojr61fwB4P0x?si=05f6360256dc485d' }
      ]
    },
    {
      id: 6,
      title: 'Medicine',
      artist_id: 2,
      status_id: 3,
      artist: { name: 'Dare County' },
      status: { name: 'In Progress' },
      tags: [
        { id: 3, name: 'Trance' },
        { id: 7, name: 'EDM' },
        { id: 8, name: 'Bittersweet' },
        { id: 14, name: 'Festival' }
      ],
      links: [
        { id: 29, link_type: 'Audio', link_url: 'https://www.labelradar.com/artists/darecountymusic/tracks/1493044' },
        { id: 32, link_type: 'Songtrust', link_url: 'https://ascap.com' }
      ]
    },
    {
      id: 7,
      title: 'Baby Pancake',
      artist_id: 1,
      status_id: 5,
      artist: { name: 'Beautifuls Dream' },
      status: { name: 'Released' },
      tags: [
        { id: 2, name: 'EDM' },
        { id: 7, name: 'AI' },
        { id: 13, name: 'Sitcom' },
        { id: 16, name: 'Synth-Pop' }
      ],
      links: [
        { id: 40, link_type: 'YouTube', link_url: 'https://www.youtube.com/watch?v=aHUwU8PYV8g' },
        { id: 49, link_type: 'Spotify', link_url: 'https://open.spotify.com/track/5mpbPCpLxathOgBmEK2FFL?si=c30c993d468d4f5c' }
      ]
    },
    {
      id: 8,
      title: 'Colorphant',
      artist_id: 1,
      status_id: 4,
      artist: { name: 'Beautifuls Dream' },
      status: { name: 'Completed' },
      tags: [
        { id: 5, name: 'Trap' },
        { id: 6, name: 'Drill' },
        { id: 7, name: 'AI' },
        { id: 9, name: 'Emo' }
      ],
      links: [
        { id: 63, link_type: 'YouTube', link_url: 'https://youtu.be/GPyZ5371ikg' },
        { id: 53, link_type: 'Songtrust', link_url: 'https://ascap.com' }
      ]
    },
    {
      id: 9,
      title: 'Back To C',
      artist_id: 1,
      status_id: 5,
      artist: { name: 'Beautifuls Dream' },
      status: { name: 'Released' },
      tags: [
        { id: 4, name: 'Pop-Punk' },
        { id: 7, name: 'AI' },
        { id: 23, name: 'Hardcore' }
      ],
      links: [
        { id: 82, link_type: 'YouTube', link_url: 'https://www.youtube.com/watch?v=0VHewgznrwU' }
      ]
    }
  ]
};