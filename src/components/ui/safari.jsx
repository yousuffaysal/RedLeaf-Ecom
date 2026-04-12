import React from "react";

export function Safari({
    url = "magicui.design",
    width = 1203,
    height = 753,
    className,
    ...props
}) {
    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            <g clipPath="url(#path0)">
                <path
                    d="M0 52H1202V741C1202 747.627 1196.63 753 1190 753H12C5.37258 753 0 747.627 0 741V52Z"
                    fill="#FFFFFF"
                    className=""
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 12C0 5.37258 5.37258 0 12 0H1190C1196.63 0 1202 5.37258 1202 12V52H0L0 12Z"
                    fill="#F5F5F5"
                    className="fill-[#E5E5E5] dark:fill-[#404040]"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.06738 12C1.06738 5.92487 5.99225 1 12.0674 1H1189.93C1196.01 1 1200.93 5.92487 1200.93 12V51H1.06738V12Z"
                    fill="white"
                    className="fill-white dark:fill-[#262626]"
                />
                <circle
                    cx="27"
                    cy="25"
                    r="6"
                    fill="#FF5F57"
                    className="fill-[#FF5F57]"
                />
                <circle
                    cx="47"
                    cy="25"
                    r="6"
                    fill="#FFBD2E"
                    className="fill-[#FFBD2E]"
                />
                <circle
                    cx="67"
                    cy="25"
                    r="6"
                    fill="#28C840"
                    className="fill-[#28C840]"
                />
                <path
                    d="M286 17C286 13.6863 288.686 11 292 11H946C949.314 11 952 13.6863 952 17V35C952 38.3137 949.314 41 946 41H292C288.686 41 286 38.3137 286 35V17Z"
                    fill="#E5E5E5"
                    className="fill-[#E5E5E5] dark:fill-[#404040]"
                />

                <g className="mix-blend-luminosity">
                    <text
                        x="50%"
                        y="30"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fill="#A3A3A3"
                        fontSize="12"
                        fontFamily="Arial, sans-serif"
                    >
                        {url}
                    </text>
                </g>
                {/* ... Skipping complex tiny icon paths for brevity/stability, keeping the main frame ... */}
                {/* Added the essential icons back for realism */}
                <g className="mix-blend-luminosity">
                    <path
                        d="M265.5 33.8984C265.641 33.8984 265.852 33.8516 266.047 33.7422C270.547 31.2969 272.109 30.1641 272.109 27.3203V21.4219C272.109 20.4844 271.742 20.1484 270.961 19.8125C270.094 19.4453 267.18 18.4297 266.328 18.1406C266.07 18.0547 265.766 18 265.5 18C265.234 18 264.93 18.0703 264.672 18.1406C263.82 18.3828 260.906 19.4531 260.039 19.8125C259.258 20.1406 258.891 20.4844 258.891 21.4219V27.3203C258.891 30.1641 260.461 31.2812 264.945 33.7422C265.148 33.8516 265.359 33.8984 265.5 33.8984ZM265.922 19.5781C266.945 19.9766 269.172 20.7656 270.344 21.1875C270.562 21.2656 270.617 21.3828 270.617 21.6641V27.0234C270.617 29.3125 269.469 29.9375 265.945 32.0625C265.727 32.1875 265.617 32.2344 265.508 32.2344V19.4844C265.617 19.4844 265.734 19.5156 265.922 19.5781Z"
                        fill="#A3A3A3"
                    />
                </g>
                <g className="mix-blend-luminosity">
                    <path
                        d="M1134 33.0156C1134.49 33.0156 1134.89 32.6094 1134.89 32.1484V27.2578H1139.66C1140.13 27.2578 1140.54 26.8594 1140.54 26.3672C1140.54 25.8828 1140.13 25.4766 1139.66 25.4766H1134.89V20.5859C1134.89 20.1172 1134.49 19.7188 1134 19.7188C1133.52 19.7188 1133.11 20.1172 1133.11 20.5859V25.4766H1128.34C1127.88 25.4766 1127.46 25.8828 1127.46 26.3672C1127.46 26.8594 1127.88 27.2578 1128.34 27.2578H1133.11V32.1484C1133.11 32.6094 1133.52 33.0156 1134 33.0156Z"
                        fill="#A3A3A3"
                    />
                </g>
            </g>
            <defs>
                <clipPath id="path0">
                    <rect width={width} height={height} fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
}