import React from "react"; 
import axios from "axios"; 
import Images from "./Images";


class Search extends React.Component {

    state = {
        keyword: "",
        photos: [],
        loader: false
    };

    inputHandle = (e) => {
        this.setState({ keyword: e.target.value });
    };

    searchImages = async (e) => {
        e.preventDefault();
        this.setState({ loader: true })
        const res = await axios.get(`https://api.pexels.com/v1/search?query=${this.state.keyword}&per_page=15&page=1`,
            {
                headers: {
                    Authorization: `2GYvkB05oFrQ0HmMRHDRiEGbJGuD1Hi6ouWR69y5TZkZgDDlaqXG1aVZ`
                },
            }
        );
        this.setState({ loader: false });
        this.setState({ photos: res.data.photos });
        console.log(this.state.photos);
    }

    render() {

        return (
            <>

                <form onSubmit={this.searchImages}>
                    <div className="form-group">
                        <input type="text" name="keyword"
                            className="form-control" value={this.state.keyword}
                            onChange={this.inputHandle}
                            placeholder="Search images..."
                        />
                    </div>

                    <div className='form-group m-3'>
                        <input
                            type="submit"
                            value="Search Images"
                            className="btn btn-primary w-100"
                        />
                    </div>

                </form>


                <div className="row">
                    {
                        !this.state.loader ? (
                            this.state.photos.map((img) => <Images image={img}
                                key={img.id} />)
                        ) : (
                            < h1 > Loading... (Please Wait)</h1 >
                        )
                    }
                </div>

            </>
        );
    }
}
export default Search;