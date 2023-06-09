import { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface Movie {
  id: string;
  title: string;
  image: string;
  videoLink: string;
  description: string;
}

const host =  "https://get-flix-back-end-liolle.vercel.app"

const CarouselComponent: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get<Movie[]>(host+'/api/movies/random?n=13/');
      setMovies(response.data);
    };
    fetchMovies();
  }, []);

  return (
    <section className="bg-gradient-to-r from-black bg-black relative z-10 overflow-hidden ">
      
       <Carousel showArrows autoPlay>
        {movies.map((movie) => (
          <div key={movie.id}>
            <img src={movie.image} alt={movie.title} />
            
          </div>
          
        ))}
       </Carousel>
      
      
    </section>
  );
};



export default CarouselComponent;
