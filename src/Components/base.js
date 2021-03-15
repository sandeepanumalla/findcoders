
import React from 'react'
import "./base.css";
import Search from './Search'

export default function base() {
    return (
        <div>
            <nav>
              <div className="logo">Github</div>
              <ul className="nav_links">
              <li><button>Saved Profile</button></li>
               <li><button>Login</button></li>
               <li><button>Logout</button></li>
              </ul>
            </nav>
            <div className="heading_animation">
              <h2>Search any Github user here</h2>
            </div>
            <Search />
        </div>
    )
}
