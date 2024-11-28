'use client'

import * as React from 'react';
import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MenuAppBar from './menuBar'; // Adjust the import based on your project structure
import ScrollTop from './ScrollTop'; // Adjust the import based on your project structure
import styled from '@emotion/styled';
import { Toolbar, Button, Typography, keyframes } from '@mui/material';
import Image from 'next/image';
import InfoModal from './InfoModal'; // Import the InfoModal component
import { Icon } from '@iconify/react';
import '../styles/scrollbar.css'; // Importa el archivo CSS personalizado

const floatAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    action: {
      hover: '#240A0A2D', // Define a color for the hover state
    },
    background: {
      default: '#d5ffe2',
      paper: '#ffffff',
    }

  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    action: {
      hover: '#1e293b', // Define a color for the hover state
    },
    background: {
      default: '#1e293b',
      paper: '#0f172a',
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});


const LightBackgroundDiv = styled('div')({
  background: 'linear-gradient(to bottom, rgba(94, 175, 136, 1), rgba(0, 128, 0, 0))', // Adjust the colors as needed
  minHeight: '25vh',
  width: '100%',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: -1,
});

const DarkBackgroundDiv = styled('div')({
  background: 'linear-gradient(to bottom,  rgba(255, 255, 255, 0.4), rgba(255, 255,0, 0))', // Adjust the colors as needed
  minHeight: '18vh',
  width: '100%',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: -1,
});

const imagesModal = [
  { type: 'image', src: '/img/Asignaturas_MainPage.jpg', title: '¿Qué es RookieAce?', description: 'Es una aplicación web diseñada para estudiantes.' },
];

const darkImages = [
  { type: 'image', src: "/img/herodark.png" },
  { type: 'image', src: "/img/Asignaturas_MainPage.jpg" },
  { type: 'image', src: "/img/Asignaturas_colores.jpg" },
  { type: 'image', src: "/img/documentos.png" },
  { type: 'image', src: "/img/pendientes2.png" },
  { type: 'image', src: "/img/Asignaturas.png" },
  { type: 'image', src: "/img/studycards.png" },
  { type: 'image', src: "/img/studycards_preguntas.png" },

];

const lightImages = [
  { type: 'image', src: "/img/hero.png" },
  { type: 'image', src: "/img/asignaturas_light.png" },
  { type: 'image', src: "/img/asignaturas_colores_light.png" },
  { type: 'image', src: "/img/asignaturas_documentos_light.png" },
  { type: 'image', src: "/img/pendientes_light.png" },
  { type: 'image', src: "/img/studycards_light.png" },
  { type: 'image', src: "/img/studycards_preguntas_light.png" },
  { type: 'image', src: "/img/calendario_light.png" },
];
export default function DashboardLayoutBasic(props: any) {
  const { window } = props;
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', description: '', imageSrc: '' });

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleOpenModal = (title: string, description: string, imageSrc: string) => {
    setModalContent({ title, description, imageSrc });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (isDarkMode ? darkImages.length : lightImages.length));
    }, 3000); // Cambia la imagen cada 5 segundos

    return () => clearInterval(interval);
  }, [isDarkMode]);

  const images = isDarkMode ? darkImages : lightImages;

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      {isDarkMode ? <DarkBackgroundDiv /> : <LightBackgroundDiv />}
      <MenuAppBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <Toolbar id="back-to-top-anchor" variant="dense" sx={{ height: 0, width: 0, padding: 0 }} />
      <Grid container spacing={2} padding={3}>
        {/* Hero Section */}
        <Grid item xs={12}>
          <Box
            sx={{
              boxShadow: isDarkMode ? '0 5px 9px  rgba(255, 255, 255, 0.5)' : '0 5px 9px rgba(94, 175, 136, 1)',
              transition: 'box-shadow 0.3s ease-in-out',
              '&:hover': {
                boxShadow: isDarkMode ? '0 10px 15px  rgba(255, 255, 255, 0.6)' : '0 10px 15px rgba(94, 175, 136, 1)',
              },
              backgroundColor: isDarkMode ? '#0f172a' : '#d5ffe2', // Color oscuro para modo oscuro
              position: 'relative',
              width: '100%',
              height: { xs: 300, md: 450, xl: 600 }, // Ajusta la altura según sea necesario
              overflow: 'hidden',
              borderRadius: 10, // Añade bordes redondeados para un mejor efecto visual
            }}


          >
            {images.map((item, index) => (
              <Box
                key={index}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: index === currentImageIndex ? 1 : 0,
                  transition: 'opacity 1s ease-in-out',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {item.type === 'image' ? (
                  <Image src={item.src || "/img/default.jpg"} alt={`Image ${index + 1}`} layout="fill" objectFit="cover" />
                ) : (
                  <Box
                    sx={{
                      color: isDarkMode ? 'white' : 'white', // Cambia el color del texto basado en el modo
                      fontSize: { xs: '3rem', md: '6rem' }, // Ajusta el tamaño de la letra para pantallas pequeñas y grandes
                      fontWeight: 'bold',
                      textAlign: 'center',

                      textShadow: isDarkMode ? '0 0 10px rgba(255, 255, 255, 0.5)' : '1px 2px 10px rgba(0, 0, 0, 0.6)', // Efecto de sombra para hacer que el texto se luzca más
                      padding: '10px', // Añade padding para que el texto no esté pegado al borde
                      borderRadius: '10px', // Añade bordes redondeados para un mejor efecto visual

                    }}
                  >


                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid container spacing={2} marginY={8} padding={3} >
          {/* Primer Componente: ¿Qué es RookieAce? */}
          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={8}>
              <Typography
                  variant="h1" // Tamaño de letra más grande
                  sx={{
                    fontWeight: 'bold',
                    fontSize: { xs: '3.5rem', md: '8rem' },
                    color: isDarkMode ? 'white' : '#3a8c65',
                    textShadow: isDarkMode ? '0 0 10px rgba(255, 255, 255, 0.5)' : '0 0 10px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  ¿Qué es RookieAce?
                </Typography>
                <Typography
                  variant="h4" // Tamaño de letra más grande
                  sx={{
                    mt: 2,
                    fontSize: { xs: '1.5rem', md: '2rem' }, // Ajusta el tamaño de la letra para pantallas pequeñas y grandes

                    fontWeight: 'bold',
                    color: isDarkMode ? 'white' : '#1d593c',
                    textShadow: isDarkMode ? '0 0 10px rgba(255, 255, 255, 0.5)' : '0 0 10px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  Es una aplicación web diseñada para estudiantes, enfocada en facilitar la gestión de tareas, recordatorios, notas y tarjetas de estudio.
                </Typography>
              </Grid>
              <Grid item xs={16} md={4}>
              <Icon
              icon={"emojione-v1:books"}
              style={{
                borderRadius: '8px',
                color: isDarkMode ? 'white' : 'black',
                width: '100%', // Ajusta el tamaño del ícono para pantallas pequeñas y grandes
                maxWidth: '450px', // Tamaño máximo del ícono
                height: 'auto', // Ajusta el tamaño del ícono para pantallas pequeñas y grandes
                paddingLeft: '100px', // Ajusta el padding para pantallas pequeñas y grandes
                paddingTop: '10px',
              }}
            />
          
              </Grid>
            </Grid>
          </Grid>

          {/* Segundo Componente: ¿Por qué unirte a RookieAce? */}
          <Grid item xs={12}>
            <Grid container spacing={2} marginY={10} alignItems="center" textAlign="right">
              <Grid item xs={12} md={4}>
                <Icon
                  icon={"heroicons:user-group-solid"}
                  style={{
                    borderRadius: '8px',
                    color: isDarkMode ? 'white' : '#febd59', // Cambia el color dependiendo del modo
                    width: '100%', // Ajusta el tamaño del ícono para pantallas pequeñas y grandes
                    maxWidth: '550px', // Tamaño máximo del ícono
                    height: 'auto', // Ajusta el tamaño del ícono para pantallas pequeñas y grandes
                    paddingLeft: '100px', // Ajusta el padding para pantallas pequeñas y grandes
                    paddingTop: '10px',
                  }}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography
                  variant="h1" // Tamaño de letra más grande
                  sx={{
                    fontWeight: 'bold',
                    fontSize: { xs: '3.5rem', md: '8rem' },
                    color: isDarkMode ? 'white' : '#3a8c65',
                    textShadow: isDarkMode ? '0 0 10px rgba(255, 255, 255, 0.5)' : '0 0 10px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  ¿Por qué unirte a RookieAce?
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    mt: 2,
                    fontSize: { xs: '1.5rem', md: '2rem' }, 
                    fontWeight: 'bold',
                    color: isDarkMode ? 'white' : '#1d593c',
                    textShadow: isDarkMode ? '0 0 10px rgba(255, 255, 255, 0.5)' : '0 0 10px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  Porque simplifica tu vida académica: organiza tareas, planifica tus estudios y mejora tu aprendizaje con herramientas intuitivas. ¡Todo en un solo lugar para maximizar tu productividad!
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="h1"
            sx={{
              mt: 2,
              fontSize: { xs: '3.5rem', md: '8rem' }, // Ajusta el tamaño de la letra para pantallas pequeñas y grandes
              fontWeight: 'bold',
              color: isDarkMode ? 'white' : '#3a8c65',
              textShadow: isDarkMode ? '0 0 10px rgba(255, 255, 255, 0.5)' : '0 0 10px rgba(0, 0, 0, 0.1)',
              textAlign: 'center', // Centra el texto
              mb: 4,
            }}
          >
            Conoce sus funcionalidades
          </Typography>
        </Grid>

        {/*  <Grid item xs={12} md={6}>
          <Box
            sx={{
              boxShadow: isDarkMode ? '0 5px 9px  rgba(255, 255, 255, 0.5)' : '0 5px 9px rgba(94, 175, 136, 1)',
              transition: 'box-shadow 0.3s ease-in-out',
              '&:hover': {
                boxShadow: isDarkMode ? '0 10px 15px  rgba(255, 255, 255, 0.5)' : '0 10px 15px rgba(94, 175, 136, 1)',
              },
              backgroundColor: isDarkMode ? '#0f172a' : '#d5ffe2', // Color oscuro para modo oscuro
              position: 'relative',
              height: 300, // Ajusta la altura según sea necesario
              overflow: 'hidden',
              borderRadius: 10,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover .initial-text': {
                  opacity: 0,
                },
                '&:hover .new-text': {
                  opacity: 1,
                },
              }}
            >
              <Box
                className="initial-text"
                sx={{
                  color: 'white',
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  transition: 'opacity 1s ease-in-out', // Transición más suave
                  opacity: 1,
                  position: 'absolute',
                  textShadow: isDarkMode ? '0 0 10px rgba(255, 255, 255, 0.2), 0 0 20px rgba(255, 255, 255, 0.3)' : '2px 3px 10px rgba(0, 0, 0, 0.7)', // Efecto de brillo solo en modo oscuro
                }}
              >
                Que es RookieAce ?
              </Box>
              <Box
                className="new-text"
                sx={{
                  color: 'white',
                  fontSize: '2.3rem',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  transition: 'opacity 1s ease-in-out', // Transición más suave
                  padding: 10,
                  opacity: 0,
                  position: 'absolute',
                  textShadow: isDarkMode ? '0 0 10px rgba(255, 255, 255, 0.2), 0 0 20px rgba(255, 255, 255, 0.3)' : '2px 3px 10px rgba(0, 0, 0.4, 0.7)', // Efecto de brillo solo en modo oscuro
                }}
              >
                Es una aplicación web diseñada para
                estudiantes, enfocada en facilitar la gestión de tareas, recordatorios, notas y tarjetas de estudio.
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              boxShadow: isDarkMode ? '0 5px 9px  rgba(255, 255, 255, 0.5)' : '0 5px 9px rgba(94, 175, 136, 1)',
              transition: 'box-shadow 0.3s ease-in-out',
              '&:hover': {
                boxShadow: isDarkMode ? '0 10px 15px  rgba(255, 255, 255, 0.5)' : '0 10px 15px rgba(94, 175, 136, 1)',
              },
              position: 'relative',
              backgroundColor: isDarkMode ? '#0f172a' : '#d5ffe2', // Color oscuro para modo oscuro
              height: 300, // Ajusta la altura según sea necesario
              overflow: 'hidden',
              borderRadius: 10,
              '&:hover .initial-content': {
                opacity: 0,
              },
              '&:hover .hover-content': {
                opacity: 1,
              },
            }}
          >
            <Box
              className="initial-content"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'opacity 0.5s ease-in-out',
                opacity: 1,
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  transition: 'opacity 0.5s ease-in-out',
                  opacity: 1,
                  textShadow: isDarkMode ? '0 0 10px rgba(255, 255, 255, 0.2), 0 0 20px rgba(255, 255, 255, 0.3)' : '2px 3px 10px rgba(0, 0, 0, 0.7)', // Efecto de brillo solo en modo oscuro
                }}
              >
                ¿Por qué unirte a RookieAce?
              </Box>
            </Box>
            <Box
              className="hover-content"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '2.2rem',
                padding: 5,
                fontWeight: 'bold',
                textAlign: 'center',
                transition: 'opacity 0.5s ease-in-out',
                opacity: 0,
                textShadow: isDarkMode ? '0 0 10px rgba(255, 255, 255, 0.2), 0 0 20px rgba(255, 255, 255, 0.3)' : '2px 3px 10px rgba(0, 0, 0.4, 0.7)', // Efecto de brillo solo en modo oscuro
              }}
            >
              Porque simplifica tu vida académica: organiza tareas, planifica tus estudios y mejora tu aprendizaje con herramientas intuitivas. ¡Todo en un solo lugar para maximizar tu productividad!
            </Box>
          </Box>
        </Grid> */}

        <Grid item xs={12} md={4}>
          <Box
            sx={{
              boxShadow: isDarkMode ? '0 5px 9px  rgba(255, 255, 255, 0.5)' : '0 5px 9px rgba(94, 175, 136, 1)',
              transition: 'box-shadow 0.3s ease-in-out',
              '&:hover': {
                boxShadow: isDarkMode ? '0 10px 15px  rgba(255, 255, 255, 0.5)' : '0 10px 15px rgba(94, 175, 136, 1)',
              },
              position: 'relative',
              backgroundColor: isDarkMode ? '#0f172a' : '#d5ffe2', // Color oscuro para modo oscuro
              height: { xs: 250, md: 300 }, // Ajusta la altura según sea necesario
              cursor: 'pointer',
              borderRadius: 7,
              overflow: 'hidden',
              // '&:hover .initial-text': {
              //   opacity: 0,
              // },
              // '&:hover .new-text': {
              //   opacity: 1,
              // },
            }}
            onClick={() => handleOpenModal(
              'Planifica tu tiempo y mejora tu rendimiento',
              'Organiza tus tareas, fechas límite de forma eficiente, adaptado a tus necesidades académicas.',
              isDarkMode ? '/gifs/calendario_dark.gif' : '/gifs/calenadario_light.gif'
            )}
          >
            <Box
              className="initial-content"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: isDarkMode ? 'url(/img/calendario.png)' : 'url(/img/calendario_light.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'opacity 0.5s ease-in-out',
                opacity: 1,
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isDarkMode ? 'white' : 'white',
                  fontSize: '3.5rem',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  transition: 'opacity 0.5s ease-in-out',
                  opacity: 1,
                  textShadow: isDarkMode
                    ? '0 0 10px rgba(255, 255, 255, 0.2), 0 0 20px rgba(255, 255, 255, 0.3)' // Efecto de brillo en modo oscuro
                    : '0 0 10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 0, 0, 0.6)',
                }}
              >
                Calendario
              </Box>
            </Box>
            <Box
              className="hover-content"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isDarkMode ? 'white' : 'black',
                fontSize: '2.2rem',
                fontWeight: 'bold',
                textAlign: 'center',
                padding: 2.1,
                transition: 'opacity 0.5s ease-in-out',
                opacity: 0,
                textShadow: isDarkMode ? '0 0 10px rgba(255, 255, 255, 0.2), 0 0 20px rgba(255, 255, 255, 0.3)' : '0 0 10px rgba(0, 0, 0, 0.3)', // Efecto de brillo solo en modo oscuro
              }}
            >
              Organiza tus tareas, fechas límite y horas de estudio de forma eficiente, adaptado a tus necesidades académicas.
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box
            sx={{
              boxShadow: isDarkMode ? '0 5px 9px  rgba(255, 255, 255, 0.5)' : '0 5px 9px rgba(94, 175, 136, 1)',
              transition: 'box-shadow 0.3s ease-in-out',
              '&:hover': {
                boxShadow: isDarkMode ? '0 10px 15px  rgba(255, 255, 255, 0.5)' : '0 10px 15px rgba(94, 175, 136, 1)',
              },
              position: 'relative',
              backgroundColor: isDarkMode ? '#0f172a' : '#d5ffe2', // Color oscuro para modo oscuro
              height: { xs: 250, md: 300 }, // Ajusta la altura según sea necesario
              cursor: 'pointer',
              borderRadius: 7,
              overflow: 'hidden',
              // '&:hover .initial-text': {
              //   opacity: 0,
              // },
              // '&:hover .new-text': {
              //   opacity: 1,
              // },
            }}
            onClick={() => handleOpenModal(
              'Resuelve tus dudas y refuerza tu conocimiento',
              'Accede a preguntas clave en cada StudyCard para mejorar tu aprendizaje y preparación de manera efectiva.',
              isDarkMode ? '/gifs/Studycards_preguntas_dark.gif' : '/gifs/studycards_preguntas_light.gif'
            )}
          >
            <Box
              className="initial-content"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: isDarkMode ? 'url(/img/studycards_preguntas.png)' : 'url(/img/studycards_preguntas_light.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'opacity 0.5s ease-in-out',
                opacity: 1,
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isDarkMode ? 'white' : 'white', // Cambia el color del texto basado en el modo
                  fontSize: '3.5rem',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  transition: 'opacity 0.5s ease-in-out',
                  opacity: 1,
                  textShadow: isDarkMode
                    ? '0 0 10px rgba(255, 255, 255, 0.2), 0 0 20px rgba(255, 255, 255, 0.3)' // Efecto de brillo en modo oscuro
                    : '0 0 10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 0, 0, 0.6)',
                }}
              >
                Studycards
              </Box>
            </Box>
            <Box
              className="hover-content"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isDarkMode ? 'white' : 'black',
                fontSize: '2.2rem',
                fontWeight: 'bold',
                padding: 3,
                textAlign: 'center',
                transition: 'opacity 0.5s ease-in-out',
                opacity: 0,
                textShadow: isDarkMode ? '0 0 10px rgba(255, 255, 255, 0.2), 0 0 20px rgba(255, 255, 255, 0.3)' : '0 0 10px rgba(0, 0, 0, 0.3)', // Efecto de brillo solo en modo oscuro
              }}
            >
              Accede a preguntas clave en cada StudyCard para mejorar tu aprendizaje y preparación de manera efectiva.
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box
            sx={{
              boxShadow: isDarkMode ? '0 5px 9px  rgba(255, 255, 255, 0.5)' : '0 5px 9px rgba(94, 175, 136, 1)',
              transition: 'box-shadow 0.3s ease-in-out',
              '&:hover': {
                boxShadow: isDarkMode ? '0 10px 15px  rgba(255, 255, 255, 0.5)' : '0 10px 15px rgba(94, 175, 136, 1)',
              },
              position: 'relative',
              backgroundColor: isDarkMode ? '#0f172a' : '#d5ffe2', // Color oscuro para modo oscuro
              height: { xs: 250, md: 300 }, // Ajusta la altura según sea necesario
              cursor: 'pointer',
              borderRadius: 7,
              overflow: 'hidden',
              // '&:hover .initial-text': {
              //   opacity: 0,
              // },
              // '&:hover .new-text': {
              //   opacity: 1,
              // },
            }}
            onClick={() => handleOpenModal(
              'Gestiona tus pendientes, cumple tus objetivos',
              'Administra y organiza tus tareas próximas con fechas límite claras para mantenerte al día y sin estrés.',
              isDarkMode ? '/gifs/pendientes_dark.gif' : '/gifs/pendientes_light.gif'
            )}
          >
            <Box
              className="initial-content"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: isDarkMode ? 'url(/img/pendientes2.png)' : 'url(/img/pendientes_light.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'opacity 0.5s ease-in-out',
                opacity: 1,
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isDarkMode ? 'white' : 'white', // Cambia el color del texto basado en el modo
                  fontSize: '3.5rem',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  transition: 'opacity 0.5s ease-in-out',
                  opacity: 1,
                  textShadow: isDarkMode
                    ? '0 0 10px rgba(255, 255, 255, 0.2), 0 0 20px rgba(255, 255, 255, 0.3)' // Efecto de brillo en modo oscuro
                    : '0 0 10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 0, 0, 0.6)',
                }}
              >
                Pendientes
              </Box>
            </Box>
            <Box
              className="hover-content"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isDarkMode ? 'white' : 'black',
                fontSize: '2.2rem',
                fontWeight: 'bold',
                padding: 5,
                textAlign: 'center',
                transition: 'opacity 0.5s ease-in-out',
                opacity: 0,
                textShadow: isDarkMode ? '0 0 10px rgba(255, 255, 255, 0.2), 0 0 20px rgba(255, 255, 255, 0.3)' : '0 0 10px rgba(0, 0, 0, 0.3)', // Efecto de brillo solo en modo oscuro
              }}
            >
              Gestiona y organiza tus tareas próximas con fechas límite claras para mantenerte al día y sin estrés.
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              boxShadow: isDarkMode ? '0 5px 9px  rgba(255, 255, 255, 0.5)' : '0 5px 9px rgba(94, 175, 136, 1)',
              transition: 'box-shadow 0.3s ease-in-out',
              '&:hover': {
                boxShadow: isDarkMode ? '0 10px 15px  rgba(255, 255, 255, 0.5)' : '0 10px 15px rgba(94, 175, 136, 1)',
              },
              position: 'relative',
              backgroundColor: isDarkMode ? '#0f172a' : '#d5ffe2', // Color oscuro para modo oscuro
              height: { xs: 250, md: 300 }, // Ajusta la altura según sea necesario
              cursor: 'pointer',
              borderRadius: 7,
              overflow: 'hidden',
              // '&:hover .initial-text': {
              //   opacity: 0,
              // },
              // '&:hover .new-text': {
              //   opacity: 1,
              // },
            }}
            onClick={() => handleOpenModal(
              'Crea tus tareas y alcanza tus metas',
              'Organiza y gestiona tus tareas de manera eficiente para mantener tu productividad al máximo.',
              isDarkMode ? '/gifs/Tareas_Dark.gif' : '/gifs/Tareas_light.gif'
            )}
          >
            <Box
              className="initial-content"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: isDarkMode ? 'url(/img/Tareas.png)' : 'url(/img/asignaturas_tareas_light.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'opacity 0.5s ease-in-out',
                opacity: 1,
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isDarkMode ? 'white' : 'white', // Cambia el color del texto basado en el modo
                  fontSize: '3.5rem',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  transition: 'opacity 0.5s ease-in-out',
                  opacity: 1,
                  textShadow: isDarkMode
                    ? '0 0 10px rgba(255, 255, 255, 0.2), 0 0 20px rgba(255, 255, 255, 0.3)' // Efecto de brillo en modo oscuro
                    : '0 0 10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 0, 0, 0.6)',
                }}
              >
                Tareas
              </Box>
            </Box>
            <Box
              className="hover-content"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isDarkMode ? 'white' : 'black',
                fontSize: '2.2rem',
                fontWeight: 'bold',
                padding: 2,
                textAlign: 'center',
                transition: 'opacity 0.5s ease-in-out',
                opacity: 0,
                textShadow: isDarkMode ? '0 0 10px rgba(255, 255, 255, 0.2), 0 0 20px rgba(255, 255, 255, 0.3)' : '0 0 10px rgba(0, 0, 0, 0.3)', // Efecto de brillo solo en modo oscuro
              }}
            >
              Organiza y gestiona tus tareas de manera eficiente para mantener tu productividad al máximo.
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              boxShadow: isDarkMode ? '0 5px 9px  rgba(255, 255, 255, 0.5)' : '0 5px 9px rgba(94, 175, 136, 1)',
              transition: 'box-shadow 0.3s ease-in-out',
              '&:hover': {
                boxShadow: isDarkMode ? '0 10px 15px  rgba(255, 255, 255, 0.5)' : '0 10px 15px rgba(94, 175, 136, 1)',
              },
              position: 'relative',
              backgroundColor: isDarkMode ? '#0f172a' : '#d5ffe2', // Color oscuro para modo oscuro
              height: { xs: 250, md: 300 }, // Ajusta la altura según sea necesario
              cursor: 'pointer',
              borderRadius: 7,
              overflow: 'hidden',
              // '&:hover .initial-text': {
              //   opacity: 0,
              // },
              // '&:hover .new-text': {
              //   opacity: 1,
              // },
            }}
            onClick={() => handleOpenModal(
              'Organiza tus ideas',
              'Guarda y gestiona notas clave en cada StudyCard para optimizar tu aprendizaje y preparación de forma efectiva.',
              isDarkMode ? '/gifs/Notas_dark.gif' : '/gifs/Notas_light.gif'
            )}
          >
            <Box
              className="initial-content"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: isDarkMode ? 'url(/img/Notas_dark.png)' : 'url(/img/asignaturas_notas_light.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'opacity 0.5s ease-in-out',
                opacity: 1,
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isDarkMode ? 'white' : 'white', // Cambia el color del texto basado en el modo
                  fontSize: '3.5rem',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  transition: 'opacity 0.5s ease-in-out',
                  opacity: 1,
                  textShadow: isDarkMode
                    ? '0 0 10px rgba(255, 255, 255, 0.2), 0 0 20px rgba(255, 255, 255, 0.3)' // Efecto de brillo en modo oscuro
                    : '0 0 10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 0, 0, 0.6)',
                }}
              >
                Notas
              </Box>
            </Box>
            <Box
              className="hover-content"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isDarkMode ? 'white' : 'black',
                fontSize: '2.2rem',
                fontWeight: 'bold',
                padding: 3,
                textAlign: 'center',
                transition: 'opacity 0.5s ease-in-out',
                opacity: 0,
                textShadow: isDarkMode ? '0 0 10px rgba(255, 255, 255, 0.2), 0 0 20px rgba(255, 255, 255, 0.3)' : '0 0 10px rgba(0, 0, 0, 0.3)', // Efecto de brillo solo en modo oscuro
              }}
            >
              Accede a preguntas clave en cada StudyCard para mejorar tu aprendizaje y preparación de manera efectiva.
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              boxShadow: isDarkMode ? '0 5px 9px  rgba(255, 255, 255, 0.5)' : '0 5px 9px rgba(94, 175, 136, 1)',
              transition: 'box-shadow 0.3s ease-in-out',
              '&:hover': {
                boxShadow: isDarkMode ? '0 10px 15px  rgba(255, 255, 255, 0.5)' : '0 10px 15px rgba(94, 175, 136, 1)',
              },
              position: 'relative',
              backgroundColor: isDarkMode ? '#0f172a' : '#d5ffe2', // Color oscuro para modo oscuro
              height: { xs: 250, md: 300 }, // Ajusta la altura según sea necesario
              cursor: 'pointer',
              borderRadius: 7,
              overflow: 'hidden',
              // '&:hover .initial-text': {
              //   opacity: 0,
              // },
              // '&:hover .new-text': {
              //   opacity: 1,
              // },
            }}
            onClick={() => handleOpenModal(
              'Sube tus documentos, analiza, y aprende',
              'Sube y guarda tus documentos para tener acceso rápido y revisarlos cuando los necesites.',
              isDarkMode ? '/gifs/Documentos_dark.gif' : '/gifs/documentos_light.gif'
            )}
          >
            <Box
              className="initial-content"
              sx={{
                position: 'relative',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: isDarkMode ? 'url(/img/documentos.png)' : 'url(/img/asignaturas_documentos_light.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'opacity 0.5s ease-in-out',
                opacity: 1,
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isDarkMode ? 'white' : 'white', // Cambia el color del texto basado en el modo
                  fontSize: '3.5rem',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  transition: 'opacity 0.5s ease-in-out',
                  opacity: 1,
                  textShadow: isDarkMode
                    ? '0 0 10px rgba(255, 255, 255, 0.2), 0 0 20px rgba(255, 255, 255, 0.3)' // Efecto de brillo en modo oscuro
                    : '0 0 10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 0, 0, 0.6)',
                }}
              >
                Documentos
              </Box>
            </Box>
            <Box
              className="hover-content"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isDarkMode ? 'white' : 'black',
                fontSize: '2.2rem',
                fontWeight: 'bold',
                padding: 3,
                textAlign: 'center',
                transition: 'opacity 0.5s ease-in-out',
                opacity: 0,
                textShadow: isDarkMode ? '0 0 10px rgba(255, 255, 255, 0.2), 0 0 20px rgba(255, 255, 255, 0.3)' : '0 0 10px rgba(0, 0, 0, 0.3)', // Efecto de brillo solo en modo oscuro
              }}
            >
              Sube y guarda tus documentos para tener acceso rápido y revisarlos cuando los necesites.
            </Box>
          </Box>
        </Grid>
      </Grid>
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
      <InfoModal open={modalOpen} onClose={handleCloseModal} title={modalContent.title} description={modalContent.description} imageSrc={modalContent.imageSrc} isDarkMode={isDarkMode} />
    </ThemeProvider>
  );
}
