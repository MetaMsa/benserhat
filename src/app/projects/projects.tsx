"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import LikeButton from "../components/LikeButton";

interface Project {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
}

export default function Projects() {
  const [data, setData] = useState<Project[]>([]);
  const [allData, setAllData] = useState<Project[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [language, setLanguage] = useState<string>("");

  useEffect(() => {
    axios.get("api/projects").then((response) => {
      setAllData(response.data);
      setData(response.data);

      const uniqueLanguages = Array.from(
        new Set(response.data.map((p: Project) => p.language).filter(Boolean))
      ) as string[];
      setLanguages(uniqueLanguages);
    });
  }, []);

  useEffect(() => {
    if (language === "") {
      setData(allData);
    } else {
      setData(allData.filter((p) => p.language === language));
    }
  }, [language, allData]);

  return (
    <div className="text-xs sm:text-sm">
      <div className="m-5 p-5 font-bold bg-gray-900 border rounded-2xl">
        <h1>PROJELERİM</h1>
        <select
          value={language}
          className="select select-secondary mt-2 bg-gray-900"
          title="Diller"
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="">Dil Seçiniz...</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
      <div className="m-5 p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 justify-items-center bg-gray-900 rounded-2xl border">
        {data.map((project) => (
          <div key={project.id} className="card bg-gray-900 shadow-sm border">
            <figure>
              <Image
                src={`https://opengraph.githubassets.com/54545/metamsa/${project.name}`}
                alt={project.name}
                width={500}
                height={300}
                priority
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{project.name}</h2>
              <p>{project.description}</p>
              <div className="card-actions grid grid-cols-2 justify-items-center">
                <div>
                  <LikeButton type={"portfolio"} slug={project.id} />
                </div>
                <div className="badge badge-outline my-auto">
                  {project.language}
                </div>
                <div className="col-span-2">
                  <Link className="btn btn-primary" href={project.html_url}>
                    Projeye git
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
