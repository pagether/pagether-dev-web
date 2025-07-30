/* eslint-disable */
import React, { useRef, useEffect, useState } from "react";
import logo from "./assets/logo.svg";
import screenshot from "./assets/screenshot.svg";
import down from "./assets/down.svg";
import icon1 from "./assets/icon1.svg";
import screenshot1 from "./assets/screenshot1.svg";
import icon2 from "./assets/icon2.svg";
import screenshot2 from "./assets/screenshot2.svg";
import icon3 from "./assets/icon3.svg";
import screenshot3 from "./assets/screenshot3.svg";
import icon4 from "./assets/icon4.svg";
import screenshot4 from "./assets/screenshot4.svg";
import icon5 from "./assets/icon5.svg";
import screenshot5 from "./assets/screenshot5.svg";
import icon6 from "./assets/icon6.svg";
import screenshot6 from "./assets/screenshot6.svg";
import "./App.css";
import BackIcon from "./assets/back.svg";
import DownloadIcon from "./assets/appstore.svg";

import termsContent from "./terms";
import privacyContent from "./privacy";

function App() {
  //주요 기능 소개
  const FeatureSection = ({ icon, image, title, description, isMobile }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.2 }
      );
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, []);

    const sectionStyles = {
      container: {
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "center" : "flex-start",
        justifyContent: "space-between",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(100px)",
        transition: "all 0.8s ease-out",
        width: "clamp(300px, 90vw, 800px)",
      },
      textBox: {
        maxWidth: "400px",
        marginTop: "40px",
        alignSelf: "flex-start",
        marginLeft: isMobile ? "30px" : 0,
      },
      title: {
        fontSize: "clamp(24px, 4vw, 40px)",
        fontWeight: "700",
        whiteSpace: "pre-line",
        marginTop: "18px",
        marginBottom: "10px",
        display: "block",
      },
      description: {
        fontSize: "clamp(13px, 2.8vw, 22px)",
        color: "#555",
        fontWeight: "300",
        whiteSpace: "pre-line",
        marginBottom: "10px",
        display: "block",
      },
      image: {
        width: "clamp(240px, 30vw, 320px)",
        height: "auto",
        borderRadius: "20px",
      },
    };
    const iconSize = isMobile ? 16 : 24;

    const resizedIcon = React.cloneElement(icon, {
      width: iconSize,
      height: iconSize,
    });

    return (
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          height: "100vh",
          marginBottom: isMobile ? "50px" : "0",
        }}
      >
        <div ref={ref} style={sectionStyles.container}>
          <div style={sectionStyles.textBox}>
            <div
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.79)",
                display: "inline-flex",
                borderRadius: "10px",
                padding: isMobile ? "8px" : "10px",
              }}
            >
              <div style={{ width: iconSize, height: iconSize }}>
                {resizedIcon}
              </div>
            </div>
            <span style={sectionStyles.title}>{title}</span>
            <span style={sectionStyles.description}>{description}</span>
          </div>
          <img src={image} alt="feature" style={sectionStyles.image} />
        </div>
      </div>
    );
  };

  const nextSectionRef = useRef(null);

  const scrollToNextSection = () => {
    nextSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [isWide, setIsWide] = useState(window.innerWidth > 1300);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [activePolicy, setActivePolicy] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsWide(window.innerWidth > 1300);
    };

    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [selectedTab, setSelectedTab] = useState("terms");

  useEffect(() => {
    if (activePolicy) {
      window.scrollTo(0, 0);
    }
  }, [activePolicy, selectedTab]);

  //이용약관, 개인정보처리방침 부분
  if (activePolicy) {
    const content = selectedTab === "terms" ? termsContent : privacyContent;


    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            justifyContent: "space-between",
            marginBottom: "30px",
            padding: "15px 20px",
          }}
          onClick={() => setActivePolicy(null)}
        >
          <img
            src={BackIcon}
            alt="back"
            style={{
              width: "30px",
              height: "30px",
            }}
          />

          <div
            style={{
              fontSize: "24px",
              fontWeight: 700,
            }}
          >
            서비스 약관 및 정책
          </div>
          <div style={{ width: "30px", height: "30px" }} />
        </div>

        <div
          style={{
            display: "flex",
            gap: "24px",
            marginBottom: "24px",
            borderBottom: "1px solid #ccc",
            padding: "0px 20px",
          }}
        >
          <div
            onClick={() => setSelectedTab("terms")}
            style={{
              fontSize: "18px",
              fontWeight: 600,
              borderBottom:
                selectedTab === "terms" ? "2px solid black" : "none",
              paddingBottom: "6px",
              cursor: "pointer",
            }}
          >
            이용약관
          </div>
          <div
            onClick={() => setSelectedTab("privacy")}
            style={{
              fontSize: "18px",
              fontWeight: 600,
              borderBottom:
                selectedTab === "privacy" ? "2px solid black" : "none",
              paddingBottom: "6px",
              cursor: "pointer",
            }}
          >
            개인정보처리방침
          </div>
        </div>

        <div
          style={{
            fontSize: "16px",
            lineHeight: 1.6,
            color: "#333",
            whiteSpace: "pre-line",
            overflowY: "auto",
            padding: "0px 30px",
          }}
        >
          {content.map((section, idx) => (
            <div
              key={idx}
              style={{ paddingBottom: "24px", borderBottom: "1px solid #ccc" }}
            >
              <h2
                style={{
                  fontSize: "23px",
                  fontWeight: 700,
                  marginBottom: "8px",
                }}
              >
                {section.title}
              </h2>
              {Array.isArray(section.content) ? (
                section.content.map((line, i) => (
                  <p key={i} style={{ margin: "6px 0" }}>
                    {line}
                  </p>
                ))
              ) : (
                <p style={{}}>{section.content}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  const styles = {
    container: {
      background: "linear-gradient(to bottom, #ffffff, #efefef)",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "30px clamp(20px, calc((100vw - 320px) / 6), 280px)",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    buttonContainer: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "#000",
      borderRadius: "41px",
      padding: isMobile ? "3px 14px" : "5px 16px",
      cursor: "pointer",
      borderWidth: "1px",
      borderColor: "#000",
      borderStyle: "solid",
    },
    buttonText: {
      color: "#fff",
      marginLeft: "10px",
      fontSize: "16px",
      fontWeight: "500",
    },
    image: {
      transform: "scaleX(-1)",
      width: "244px",
      height: "407px",
    },
    content: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: isMobile ? "60px" : 0,
    },
    secondSection: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      overflowY: "auto",
    },
  };

  return (
    <div>
      <div style={styles.container}>
        <div style={styles.header}>
          <img
            src={logo}
            style={{
              width: "clamp(17px, 1.5vw, 24px)",
              height: "auto",
            }}
            alt="logo"
          />
          <a
            href="https://apps.apple.com/kr/app/%ED%8E%98%EC%9D%B4%EC%A7%80%EB%8D%94-%EB%8F%85%EC%84%9C-%EA%B8%B0%EB%A1%9D-sns/id6747913470"
            target="_blank"
            rel="noopener noreferrer" 
            style={{ textDecoration: "none" }}
          >
            <div>
              <img
                src={DownloadIcon}
                alt="Download"
                style={{
                  width: "clamp(100px, 10vw, 140px)",
                  height: "auto",
                  display: "block",
                }}
              />
            </div>
          </a>
        </div>
        <div style={styles.content}>
          <span
            style={{
              fontSize: "clamp(40px, 5vw, 60px)",
              fontWeight: 150,
              alignSelf: isMobile ? "flex-start" : "auto",
              textAlign: "left",
              width: isMobile ? "100%" : "auto",
            }}
          >
            독서, 함께해서
            <br />
            더욱 즐겁게
            <br />
            <span
              style={{ fontSize: "clamp(52px, 6vw, 80px)", fontWeight: 300 }}
            >
              pagether
            </span>
          </span>
          <div>
            {/* {isWide && <img src={screenshot} style={styles.image} />} */}
            <img
              src={screenshot}
              style={{
                width: "clamp(235px, 30vw, 350px)",
                height: "auto",
                marginTop: isMobile ? "20px" : "0",
              }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: isMobile ? "20px" : "30px",
          }}
          onClick={scrollToNextSection}
        >
          <img src={down} alt="arrow" />
        </div>
      </div>
      <div ref={nextSectionRef} style={{ marginTop: "100px" }}>
        <FeatureSection
          icon={<img src={icon1} />}
          image={screenshot1}
          title={"친구들의 독서활동 \n한눈에 확인하기"}
          description={
            "다른 사람들의 소식을 확인하며 \n새로운 책을 발견해보세요"
          }
          isMobile={isMobile}
        />
      </div>
      <FeatureSection
        icon={<img src={icon2} />}
        image={screenshot2}
        title={"내 서재 살펴보기 "}
        description={"읽고 있는 책과 관심 있는 책을 \n함께 확인할 수 있어요"}
        isMobile={isMobile}
      />
      <FeatureSection
        icon={<img src={icon3} />}
        image={screenshot3}
        title={"읽기 상태 \n자유롭게 관리하기"}
        description={
          "읽는 페이지 수정과 완독, 중단, 다회독까지 \n손쉽게 설정할 수 있어요"
        }
        isMobile={isMobile}
      />
      <FeatureSection
        icon={<img src={icon4} />}
        image={screenshot4}
        title={"생각 기록하고 \n공유하기"}
        description={
          "책을 읽으며 떠오른 생각을 노트에 남기고, \n스포일러나 비공개 설정으로 공개 범위를 \n조정할 수 있어요"
        }
        isMobile={isMobile}
      />
      <FeatureSection
        icon={<img src={icon5} />}
        image={screenshot5}
        title={"마음에 드는 문장 \n바로 저장하기"}
        description={"텍스트 자동인식으로 책의 인상 깊은 구절을 \n수집하세요"}
        isMobile={isMobile}
      />
      <FeatureSection
        icon={<img src={icon6} />}
        image={screenshot6}
        title={"나의 독서활동 \n한눈에 확인하기"}
        description={
          "날짜별 독서 활동을 살펴보고, 독서 습관을 \n꾸준히 이어가세요"
        }
        isMobile={isMobile}
      />
      <div
        style={{
          fontSize: "14px",
          fontWeight: "300",
          color: "#828282",
          textAlign: "center",
          padding: "50px 0",
        }}
      >
        <div style={{ marginBottom: isMobile ? "15px" : "20px" }}>
          <span
            onClick={() => {
              setActivePolicy("terms");
              setSelectedTab("terms");
            }}
            style={{ marginRight: isMobile ? "15px" : "40px" }}
          >
            이용약관
          </span>
          <span
            onClick={() => {
              setActivePolicy("privacy");
              setSelectedTab("privacy");
            }}
          >
            개인정보처리방침
          </span>
        </div>
        <span>ⓒ 2025. pagether All rights reserved.</span>
      </div>
    </div>
  );
}

export default App;
