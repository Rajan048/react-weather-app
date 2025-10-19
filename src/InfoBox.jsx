import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "./InfoBox.css";
import SevereColdIcon from '@mui/icons-material/SevereCold';
import SunnyIcon from '@mui/icons-material/WbSunny';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';

export default function InfoBox({ info }) {
  const INIT_URL = "https://plus.unsplash.com/premium_photo-1671229455344-a3b4f96c2c76?auto=format&fit=crop&q=80&w=1332";
  const HOT_URL = "https://images.unsplash.com/photo-1504370805625-d32c54b16100?auto=format&fit=crop&q=80&w=1332";
  const COLD_URL = "https://plus.unsplash.com/premium_photo-1732541738402-cee5b805b523?auto=format&fit=crop&q=80&w=1170";
  const RAIN_URL = "https://images.unsplash.com/photo-1536329978773-2f8ac431f330?auto=format&fit=crop&q=80&w=735";

  // Determine background image
  let imageUrl = INIT_URL;
  if (info.humidity > 80) imageUrl = RAIN_URL;
  else if (info.temp > 30) imageUrl = HOT_URL;
  else if (info.temp < 15) imageUrl = COLD_URL;

  // Determine weather icon
  let WeatherIcon = null;
  if (info.humidity > 80) WeatherIcon = <ThunderstormIcon style={{ color: 'gray', verticalAlign: 'middle' }} />;
  else if (info.temp > 30) WeatherIcon = <SunnyIcon style={{ color: 'orange', verticalAlign: 'middle' }} />;
  else if (info.temp < 15) WeatherIcon = <SevereColdIcon style={{ color: 'lightblue', verticalAlign: 'middle' }} />;

  return (
    <div className="InfoBox">
      <div className='cardcontainer'>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={imageUrl}
            title="Weather image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {info.city}, {info.country} {WeatherIcon}
            </Typography>
            <Typography variant="body2" color='text.secondary' component={"span"}>
              <p> Temperature: {info.temp} °C (Min: {info.tempMin} °C, Max: {info.tempMax} °C)</p>
              <p> Feels Like: {info.feelsLike} °C</p>
              <p> Humidity: {info.humidity} %</p>
              <p> Weather: <i>{info.weather}</i></p>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
