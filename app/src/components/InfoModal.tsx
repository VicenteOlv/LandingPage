import * as React from 'react';
import { Modal, Box, Typography, Divider, Grid } from '@mui/material';
import Image from 'next/image';

const modalStyle = (isDarkMode: boolean) => ({
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%', // Más ancho
  height: '60%', // Más alto
  bgcolor: isDarkMode ? '#1e293b' : '#5eaf88',
  boxShadow: isDarkMode ? '0 0 20px 5px rgba(255, 255, 255, 0.5)' : '0 0 20px 5px rgba(213, 255, 226, 1)',
  p: 2,
  borderRadius: 5,
  border: isDarkMode ? '2px solid rgba(255, 255, 255, 0.7)' : '2px solid rgba(0, 0, 0, 0.3)', // Ajusta el color del borde según el modo
});

interface InfoModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  imageSrc: string;
  isDarkMode: boolean;
}

const InfoModal: React.FC<InfoModalProps> = ({ open, onClose, title, description, imageSrc, isDarkMode }) => (
  <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
    <Box sx={modalStyle(isDarkMode)}>
      <Grid container spacing={2} alignItems="center" sx={{ paddingTop:5.5, }}> {/* Agrega paddingTop */}
        {/* Columna de la imagen */}
        <Grid item xs={6}>
          {imageSrc && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Image
                src={imageSrc}
                alt={title}
                width={800}
                height={700}
                layout="intrinsic"
                quality={100}
                style={{ objectFit: 'cover', borderRadius: '12px' }}
              />
            </Box>
          )}
        </Grid>

        {/* Divider entre la imagen y el contenido */}
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            mx: 3,
            mt: 2,
            borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(213, 255, 226, 1)',
            borderWidth: '2px',
            boxShadow: isDarkMode ? '0 0 10px rgba(255, 255, 255, 0.5)' : '0 0 10px rgba(213, 255, 226, 1)',
          }}
        />

        {/* Columna del contenido */}
        <Grid item xs={5.5}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center', // Centrado vertical
              alignItems: 'left', // Centrado horizontal
              textAlign: 'left', // Centrado del texto
              height: '100%', // Ocupa todo el espacio disponible
            }}
          >
            <Typography
              id="modal-title"
              variant="h4"
              sx={{
                fontWeight: 'bold',
                textAlign: 'left',
                color: 'white', // Mantén el color blanco
                textShadow: '0 0 10px rgba(0, 0, 0, 0.6)', // Agrega una sombra oscura
              }}
            >
              {title}
            </Typography>
            <Typography
              id="modal-description"
              variant="h5"
              sx={{
                mt: 2,
                textAlign: 'left',
                color: 'white', // Mantén el color blanco
                textShadow: '0 0 10px rgba(0, 0, 0, 0.6)', // Agrega una sombra oscura
              }}
            >
              {description}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  </Modal>
);

export default InfoModal;