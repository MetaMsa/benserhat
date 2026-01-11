"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

interface Project {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
}

export default function Projects() {
  const [data, setData] = useState<Project[]>([]);

  useEffect(() => {
    axios.get("api/projects").then((response) => setData(response.data));
  }, []);

  console.log(data);

  return (
    <div className="text-xs sm:text-sm">
      <h1 className="m-5 p-5 font-bold bg-gray-900 border rounded-xl5 rounded-2xl">PROJELERİM</h1>
      <div className="m-5 p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 justify-items-center bg-gray-900 rounded-2xl border">
        {data.map((project) => (
          <div key={project.id} className="card bg-base-100 shadow-sm border">
            <figure>
              <Image
                src={`https://opengraph.githubassets.com/54545/metamsa/${project.name}`}
                alt="Shoes"
                width={500}
                height={300}
                priority
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{project.name}</h2>
              <p>
                {project.description}
              </p>
              <div className="card-actions justify-end">
                <Link className="btn btn-primary" href={project.html_url}>Projeye git</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
