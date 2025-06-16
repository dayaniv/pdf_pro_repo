import React, { useRef } from "react";

function HeaderNavAndContent({ parsed }) {
  const sectionRefs = useRef([]);

  sectionRefs.current =
    parsed.map((_, i) => sectionRefs.current[i] ?? React.createRef()) || [];

  const handleClick = (index) => {
    sectionRefs.current[index].current?.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <>
      {parsed && parsed.length > 0 ? (
        <div>
          {/* Top: Header Navigation */}
          <nav
            style={{
              position: "sticky",
              top: 0,
              background: "gray",
              padding: "10px",
            }}
          >
            {parsed?.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleClick(idx)}
                style={{ margin: "5px", padding: "5px 10px" }}
              >
                {item.header}
              </button>
            ))}
          </nav>

          {/* Bottom: Detailed Content */}
          <div style={{ marginTop: "8%" }}>
            {parsed?.map((item, idx) => (
              <div
                key={idx}
                ref={sectionRefs.current[idx]}
                id={`section-${idx}`}
                style={{ marginBottom: "50px" }}
              >
                <h2>{item.header}</h2>
                <p>{item.paragraph}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
export default HeaderNavAndContent;
