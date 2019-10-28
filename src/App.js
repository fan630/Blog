import React, { Component } from 'react'
import './style.css'
import axios from 'axios'

class Post extends Component {
    constructor() {
        super()
        this.state = {
            post: {}
        }
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts/' + (this.props.postId))
            .then(response => {
                this.setState({
                    post: response.data
                })
            })
    }

    render() {
        const { post } = this.state
        return (
            <div>
                <h3>{post.title}</h3>
                <div>id:{post.id}</div>
                <div>
                    userId: {post.userId}
                </div>
                <p>
                    content: {post.body}
                </p>
            </div>
        )
    }
}
class ArticleContent extends Component {
    constructor() {
        super()
        this.state = {
            postid: null,
            articles: []
        }
    }


    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                this.setState({
                    articles: response.data
                })
            })
    }

    handleClick = (e) => {
        const { postId } = this.state
        this.setState({
            postId: e.target.id
        })
    }

    handleBack = () => {
        this.setState({
            postId: null
        })
    }

    render() {
        const { articles, postId } = this.state
        return (
            <div>
                <h2 className="title">Blog posts</h2>
                {postId && <button type="button" className="btn btn-primary" onClick={this.handleBack}>Back</button>}
                {
                    postId && <Post postId={postId} />
                }

                {
                    !postId && <div>
                        {
                            articles.map(article => (
                                <div className="row" id={article.id} key={article.id} onClick={this.handleClick}>{article.title}</div>
                            ))
                        }
                    </div>
                }

            </div>
        )
    }
}

class AboutContent extends Component {
    constructor() {
        super()
        this.state = {
            articles: []
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    articles: data
                })
            })
    }

    render() {
        const { articles } = this.state
        return (
            <div>
                <h2 className="title" >Casual words</h2>
                <div>
                    {
                        articles.map(article => (
                            <div className="row" key={article.id}>{article.title}</div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

class App extends Component {
    constructor() {
        super()
        this.state = {
            name: '', 
        }
    }

    handleClick = (e) => {
        e.preventDefault();
        const { name } = this.state
        this.setState({
            name: e.target.name
        })
    }

    render() {
        const { name} = this.state
        return (
            <div className="wrapper">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#" name="Blog">Blog</a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className={"nav-item" + (name === 'Article' ? 'active' : '')}>
                                <a className="nav-link" href="#" name="Article" onClick={this.handleClick}>Article</a>
                            </li>
                            <li className={"nav-item" + (name === 'About' ? 'active' : '')}>
                                <a className="nav-link" href="#" name="About" onClick={this.handleClick}>About</a>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div className="content__wrapper">
                    <div className="content">
                        <div>
                            {name === '' && <ArticleContent />}
                            {name === 'Article' && <ArticleContent />}
                            {name === 'About' && <AboutContent />}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App