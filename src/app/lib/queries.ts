// src/lib/queries.ts
export const getProjectsQuery = `*[_type == "project"]{
  _id,
  title,
  description,
  link,
  image
}`;

export const getSkillsQuery = `*[_type == "skill"]{_id, name, level}`;

export const eventQuery = `*[_type == "event"] | order(date desc){
  _id,
  title,
  date,
  description
}`;


export const getBioQuery = `*[_type == "bio"][0]{name, about}`;

export const getContactQuery = `*[_type == "contact"][0]{email, phone, linkedin}`;

