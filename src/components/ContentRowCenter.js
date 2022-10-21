import LastMovieInDb from './LastProductInDb';
import GenresInDb from './ProductsByCategory';

function ContentRowCenter(){
    return (
        <div className="row">
            <LastMovieInDb />
            <GenresInDb />
        </div>
    )
}

export default ContentRowCenter;