// Project data
const projects = [
  {
    id: 1,
    title: "출결관리 시스템 개발",
    description: "기존 플랫폼에 존재하지 않던 출결관리 기능을 처음부터 도입·설계한 신규 프로젝트입니다.",
    period: "2024.12 - 2025.02",
    techStack: ["Kotlin", "Spring Boot", "MySQL", "Exposed DAO"],
    images: [
      "/images/attendance/attendance_domain.png",
      "/images/attendance/attendance_process.png",
      "/images/attendance/attendance01.png",
      "/images/attendance/attendance02.png",
      "/images/attendance/attendance03.png"
    ],
    features: [
      "초기 기획부터 요구사항 정의, 도메인 설계, API 개발 전반 주도",
      "출결 관리와 클래스 그룹 기능을 독립적인 모듈로 설계",
      "Restful API 프로토콜 확립 및 개발"
    ],
    achievements: [
      "일정 내 100% 완수",
      "클라이언트 요구사항 대비 +30% 수준 고도화 기능 제공 -> 높은 만족도",
      "명확한 API 사전 협의로 개발 병렬화 -> 개발 기간 50% 단축",
      "모듈화 설계 -> 유사 기능 개발 리소스 30% 이상 절감 예상"
    ],
    insights: [
      "타팀과 적극적인 커뮤니케이션을 통한 업무 효율성 증가를 경험했습니다.",
      "단순 구현보다 사용자 경험과 시스템 구조의 유연성을 함께 고려하는 설계의 중요성을 확인했습니다.",
      "이후 다른 신규 기능 개발에서도 재사용 가능한 구조로 만드는 습관을 가지게 되었습니다."
    ]
  },
  {
    id: 2,
    title: "Wecandeo 영상 기능 마이그레이션",
    description: "기존 영상 관리 시스템을 SaaS 기반 Wecandeo API로 마이그레이션한 프로젝트입니다.",
    period: "2024.11 - 2024.12",
    techStack: ["Kotlin", "Spring Boot", "REST API", "Wecandeo API", "Object Storage"],
    images: [
      "/images/wecandeo/wecandeo_process.png",
      "/images/wecandeo/wecandeo01.png",
      "/images/wecandeo/wecandeo02.png",
      "/images/wecandeo/wecandeo03.png",
      "/images/wecandeo/wecandeo04.png"
    ],
    features: [
      "기존 시스템 구조 분석 및 정리 -> 전체 흐름을 다이어그램으로 시각화",
      "주요 API 호출 로직 사전 구현",
      "외부 업체와의 기술 커뮤니케이션 주도 -> API 버그 리포트 및 해결",
      "UX 중심의 기능 고도화"
    ],
    achievements: [
      "PaaS → SaaS 전환으로 인프라 운영 비용 약 82% 절감",
      "기존 기능 구조 분석 및 API 사전 테스트 -> 총 개발 기간 단축",
      "API 상태값 세분화 및 UX 개선 -> 사용자 불편 피드백 감소",
    ],
    insights: [
      "전체 시스템 흐름을 이해하고 설계할 줄 아는 역량의 중요성을 느꼈습니다.",
      "외부 API 연동 시 예상하지 못한 리스크에 대한 사전 대응 전략의 필요성을 느꼈습니다.",
    ]
  },
  {
    id: 3,
    title: "YaguRoute",
    description: "야구 팬 커뮤니티를 위한 통합 플랫폼으로, 커뮤니티 게시판, 티켓 판매/구매, 결제 및 알림 기능을 담당했습니다. 백엔드와 프론트 모두 수행했습니다.",
    period: "2023.04 - 2023.06",
    techStack: ["Java", "Spring", "MyBatis", "MySQL", "JavaScript", "jQuery", "Naver Cloud"],
    images: [
      "/images/yaguroute/yaguroute1.png",
      "/images/yaguroute/yaguroute2.png",
      "/images/yaguroute/yaguroute3.png",
      "/images/yaguroute/yaguroute4.png",
      "/images/yaguroute/yaguroute5.png",
      "/images/yaguroute/yaguroute6.png",
      "/images/yaguroute/yaguroute7.png",
      "/images/yaguroute/yaguroute8.png"
    ],
    features: [
      "티켓 판매/구매 시스템",
      "PortOne API를 이용한 결제 연동",
      "결제/취소 시 SMS 알림 기능 (Naver SENS)",
      "커뮤니티 게시판, 댓글 CRUD"
    ],
    achievements: [
      "재사용 가능한 결제·SMS 모듈 개발로 팀 전체 개발 속도 향상",
      "CORS 문제 해결 -> 외부 API 안정적 통신 확보",
      "클라우드 배포 경험 -> 운영 환경 이해도 향상"
    ],
    insights: [
      "Java, Spring 기반 웹 서비스 설계 및 개발 경험을 체득했습니다.",
      "실무에 가까운 협업 구조에서 모듈화와 코드 공유의 중요성 체감했습니다.",
      "클라우드 배포·운영 경험을 통한 서버 구성 이해도가 높아졌습니다."
    ]
  },
  {
    id: 4,
    title: "굿즈 쇼핑몰",
    description: "아이돌 굿즈 판매를 위한 쇼핑몰 웹 사이트로, 회원 가입부터 상품 관리, 결제까지 포함된 개인 프로젝트입니다.",
    period: "2023.02 - 2023.03",
    techStack: ["Java", "Spring", "MyBatis", "Oracle", "JavaScript", "jQuery", "PortOne"],
    images: [
      "/images/shopping/shop1.png",
      "/images/shopping/shop1.2.png",
      "/images/shopping/shop2.png",
      "/images/shopping/shop3.png",
      "/images/shopping/shop4.png"
    ],
    features: [
      "회원/상품/구매 관리 CRUD 전반 구현",
      "PortOne 결제 API + Naver SENS 연동",
      "무한 스크롤 / 자동완성 구현"
    ],
    achievements: [
      "POST-Redirect-GET 패턴 적용으로 중복 결제 문제 해결",
      "상용 수준의 결제 시스템 구현",
    ],
    insights: [
      "Java, Spring을 기반으로 MVC 패턴의 웹 서비스 구축 경험을 쌓았습니다.",
      "프로젝트의 전 과정을 독립적으로 수행하며 백엔드와 프론트를 수행했습니다."
    ]
  }
];

// Export for use in other files
window.projects = projects;