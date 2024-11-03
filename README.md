# 개인 블로그

## 프로젝트 소개
Next.js(14)와 Notion API를 활용하여 제작한 개인 블로그입니다. 블로그에 사용되는 검색, 페이징, 필터링 등의 기능들이 다른 유형의 사이트에서도 자주 볼 수 있는 기능이라고 생각해 실제로 구현해보며, 구현 방식 탐구와 구현 시 고충을 알아봄과 동시에 개인 기록용 사이트를 하나 만들어보고자 제작 했습니다.
<br/>

## STACKS   
### Base
- Next.js
- React.js
- TypeScript
- Notion API
### lib
- Tailwind CSS
- PrismJS
- Framer-motion
- Next-themes
- React-notion-x
- Redux
<br/>

## 시작하기
### 사전 요구 사항
- Node.js v20 이상
- Notion / API 키, 데이터베이스 키

### 설치
```bash
npm install
```

### 환경 변수 설정
```plaintext
NOTION_TOKEN=노션API 키
NOTION_DATABASEID=해당 데이터베이스 키
```

### 프로젝트 실행, 빌드
```bash
npm run dev
npm run build
npm start
```
<br/>

## 기능 소개   
- 제목 검색
- 일반, 다크, 시스템 별 테마 지정 (다크모드)
- 카테고리 필터링
- 페이징
- 스타일 커스텀 설정
<br/>

## 주요 특징   
- **캐싱**   
  노션은 자잘한 텍스트 문단도 문자열이 덩어리가 아닌 블록 객체라고 하는 하나의 요소로 규정합니다. 이로 인해 노션 자체에서 텍스트 문단의 위치 조정이나 요소의 전환 등 자유로운 인터랙션을 제공해줍니다. 하지만 이 특성으로 인해 API를 통해 데이터로 받아올 경우 단순한 텍스트 콘텐츠에도 꽤나 많은 양의 데이터를 보내주며, 노션에서는 이를 최소화 하기 위해 데이터베이스 쿼리 메서드를 통해 응답을 받아와도 그 데이터베이스 내부의 상세한 콘텐츠를 볼 수 없습니다.<br/>
  이러한 데이터를 그대로 응답 받으면 속도도 느리고 요청에서도 문제될수도 있을 것이라고 생각하고 Node.js에서 해당 모듈의 경로를 key로 설정하는 <code>require.cache</code>를 참고하여 카테고리 이름을 key로 하고 만료 기간을 설정해 한번 불러온 데이터를 캐싱하여 사용했습니다.<br/>
  ```typescript
   /**
   * @param category 카테고리 명
   */
   export const getCachedPostList = async (category?: string): Promise<cacheDataType> => {
    // 호출 당시 시간
    const currentTime = Date.now();

	  ...

	  // 캐시 데이터에 없을 시 값 할당
    if (!cacheData[cateId]) {
      cacheData[cateId] = {
        data: {...},
        timestamp: 0,
        expiration: 100000,
      };
    }

	  // 캐시 만료 시간 계산 후 결과 반환
    if (
      currentTime - cacheData[cateId].timestamp >
      cacheData[cateId].expiration
    ) {
	  // 노션 SDK로 가져온 데이터
      const postList = await getPostList(category);
    
      cacheData[cateId].data = postList;
      cacheData[cateId].timestamp = currentTime;
    
      return postList;
    } else {
      return cacheData[cateId].data;
    }
  };
  ```

- **정적 페이지 생성**   
  업데이트나 수정사항이 잦은 사이트는 아니라는 점을 이용하여 최적화를 구현하고자 Next.js에서 제공하는 <code>generateStaticParams</code>를 통해 빌드 타임에서 정적 페이지를 생성하게 하여 탐색 경험을 높여주었습니다.

- **페이징**   
  URL 파라미터를 통해 페이징을 구현하던 기존 방식과 다르게 전역 상태와 세션 스토리지를 사용하여 구현해보았습니다. 페이징 자체는 전역 상태만으로도 문제 없었지만, 뒤로가기 등의 히스토리 API에서 페이지 이동 정보를 기억하던 것들을 저장하기 위해 세션 스토리지를 사용하고 각 페이지와 해당 페이지가 속한 그룹의 정보를 기억하게 하여 구현했습니다. 이를 제작하면서 실제 납품되는 웹사이트에선 어떤 방식을 선택하는 것이 좋을 지 알 수 있었습니다.

- **커스텀 설정**   
  디자인을 헤치지 않는 선에서 웹 사이트에 대한 시각적 편의성과 자유도를 제공하고자 하여 내부의 몇몇 디자인 요소들을 사용자가 직접 커스텀할 수 있는 기능을 제작했습니다. 해당 과정에 일어나는 재렌더링으로 인한 메모리 소모를 최소화 하는 것에 염두하며 제작하였고 기능을 통해 폰트 사이즈, 게시글 목록 형태 등을 사용자가 직접 설정할 수 있습니다.
<br/>

## 디자인   
- **레이아웃**   
  사이트의 목적인 정보 전달을 확실하게 하기 위해 최대한 간소화되고 정렬된 레이아웃을 구성했습니다.
  
- **컬러, 폰트**   
  많은 양의 정보를 전달하게 되어 눈의 피로감을 줄 수 있는 사이트의 단점을 고려하여 눈의 피로감을 줄여준다는 녹색 계열 파스텔톤 컬러를 베이스로 지정하고 나머지 컬러 또한 같은 계열의 컬러를 사용해 눈의 피로감을 낮추고 사이트의 통일성을 높여주기 위한 시도를 하였습니다.<br/>
  폰트는 많은 양의 텍스트 전달을 고려하여 고딕 계열이면서도 많은 웹에서 사용하여 글꼴에 대한 사용자 인지도를 높여 주기 위하여 프리텐다드 폰트를 메인으로 사용했습니다.
<br/>

## 참고 자료
- [Notion API](https://developers.notion.com/reference/database)
