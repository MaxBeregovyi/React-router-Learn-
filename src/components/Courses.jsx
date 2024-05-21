import { Link, useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import courses from "../data/courses";
import { useEffect, useState } from "react";

const SORT_KEYS = ["title", "id", "slug"];

function sortCourses(courses, key) {
  const sortedCourses = [...courses];
  if (!key || !SORT_KEYS.includes(key)) {
    return sortedCourses;
  }
  sortedCourses.sort((a, b) => (a[key] > b[key] ? 1 : -1));
  return sortedCourses;
}

const Courses = () => {
  const location = useLocation();
  const query = queryString.parse(location.search);
  const navigate = useNavigate();

  const initialSortKey = SORT_KEYS.includes(query.sort) ? query.sort : null;
  const [sortKey, setSortKey] = useState(initialSortKey);
  const [sortedCourses, setSortedCourses] = useState(
    sortCourses(courses, initialSortKey),
  );

  useEffect(() => {
    if (!SORT_KEYS.includes(sortKey)) {
      setSortKey(null);
      setSortedCourses([...courses]);
      navigate(".");
    } else {
      const sorted = sortCourses(courses, sortKey);
      setSortedCourses(sorted);
      console.log(sorted); // Печатает отсортированный массив курсов
    }
  }, [sortKey, navigate]);

  const handleSortChange = (event) => {
    const newSortKey = event.target.value;
    setSortKey(newSortKey);
    navigate(`?sort=${newSortKey}`);
  };

  return (
    <>
      <h1>{!sortKey ? "Courses" : `Sort by ${sortKey}`}</h1>
      <label htmlFor="sort">Sort by: </label>
      <select id="sort" value={sortKey || ""} onChange={handleSortChange}>
        <option value="">None</option>
        {SORT_KEYS.map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      {sortedCourses.map((course) => (
        <div key={course.id}>
          <Link to={course.slug} className="courseLink">
            {course.title}
          </Link>
        </div>
      ))}
    </>
  );
};

export default Courses;
