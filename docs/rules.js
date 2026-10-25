/*
 * CivicTA Evidence Matrix — 연구자가 검토하고 PR로 변경하는 코딩 기준.
 * 절대 제목 키워드만으로 논문의 내용·정책 반영 여부를 자동 추정하지 않습니다.
 */
window.CIVICTA_RULES = Object.freeze({
  version: '1.1.0',
  name: 'CivicTA 문헌 코딩 프레임',
  policyStages: ['의제설정', '숙의·공론화', '정책설계·결정', '집행·평가'],
  hciDimensions: ['접근성·포용성', '정보이해·설명', '숙의·상호작용', '피드백·반영추적', '신뢰·책임성'],
  evidenceTypes: ['실증연구', '사례연구', '문헌연구', '개념·규범연구', '미분류'],
  policyLinkages: ['반영 근거 확인', '반영 주장·근거 불명', '반영 정보 없음', '해당 없음', '미코딩·판정 보류'],
  verificationStates: ['원문 검토', '초록 검토', '서지 확인', '검토 필요', '시연용 가상자료'],
  requiredColumns: ['id', 'title', 'year', 'policy_stage', 'hci_dimension'],
  csvColumns: ['id', 'title', 'year', 'doi', 'technology', 'policy_stage', 'hci_dimension', 'evidence_type', 'policy_linkage', 'verification', 'source_url', 'notes'],
  minYear: 1990,
  maxYear: 2035,
  // 범주의 뜻과 경계: 화면(머리글·칸 선택·분류 기준)과 보고서에 그대로 보여 준다.
  // 정의·예시·구분 기준은 planning/분류_코드북.md A·B절에서 옮겼다. 범주 목록과 집계 규칙은 바꾸지 않는다.
  // short는 매트릭스 머리글용 한 줄, definition은 운영 정의, example은 포함 사례, boundary는 이웃 범주와 가르는 기준.
  categoryGuide: Object.freeze({
    policyStages: Object.freeze({
      '의제설정': Object.freeze({ short: '무엇을 다룰지 정하기', definition: '해결할 기술 문제·위험·대안의 질문을 정하는 단계', example: '기술 우선순위 시민 의견수렴, 쟁점 발굴', boundary: '이미 정한 대안을 최종 선택한다면 정책설계·결정' }),
      '숙의·공론화': Object.freeze({ short: '정보를 나누며 토론하기', definition: '참여자가 정보를 교환하며 쟁점과 대안을 토론하는 단계', example: '시민배심원, 숙의 포럼, 온라인 토론', boundary: '단순한 일방향 정보 게시만으로 숙의라 판단하지 않음' }),
      '정책설계·결정': Object.freeze({ short: '정책으로 정하고 결정하기', definition: '제안·대안이 구체 정책으로 정리되고 결정되는 단계', example: '시민 제안이 정책 선택지와 비교되는 의사결정', boundary: '단순 의견 접수는 정책 반영 확인이 아님' }),
      '집행·평가': Object.freeze({ short: '시행 결과를 추적·개선하기', definition: '정책의 시행 결과를 모니터링하고 개선하는 단계', example: '수용된 의견의 실행·추적, 성과 피드백', boundary: '정책 결정을 알리는 공지만으로 정책 집행을 단정하지 않음' })
    }),
    hciDimensions: Object.freeze({
      '접근성·포용성': Object.freeze({ short: '누구나 참여할 수 있게', definition: '서로 다른 시민이 참여할 수 있도록 접근 장벽을 낮추는 설계', example: '모바일·장애 접근성·언어 장벽·디지털 리터러시 지원', boundary: '참여자 수가 많다는 사실만으로 포용성 높음을 주장하지 않음' }),
      '정보이해·설명': Object.freeze({ short: '위험·근거를 이해하게', definition: '신흥기술·정책 선택지의 위험, 한계, 근거를 시민이 이해하도록 지원', example: '쉬운 정보 설계, 시각적 설명, 선택지 비교', boundary: '설명이 제공되었다는 것과 실제 이해 증진은 별개' }),
      '숙의·상호작용': Object.freeze({ short: '서로 의견을 주고받게', definition: '의견 교환·상호 관점 이해·공동 구성에 필요한 상호작용', example: '토론 구성, 댓글 구조, 합의/이견 탐색', boundary: '단순 좋아요 클릭을 숙의 품질 향상으로 단정하지 않음' }),
      '피드백·반영추적': Object.freeze({ short: '제안이 어떻게 됐는지 알게', definition: '제안이 검토·선택·거절·실행되는 단계를 사용자가 추적하는 기능', example: '제안별 상태 변경, 반영 여부 알림, 거절 사유 공개', boundary: '상태 UI가 있다고 실제 정책 영향이 증명되는 것은 아님' }),
      '신뢰·책임성': Object.freeze({ short: '누가 왜 결정했는지 밝히게', definition: '처리 규칙·개인정보·결정 책임을 명확히 하는 상호작용', example: '결정 근거, 검토 책임자, 조작 방지, 신뢰 평가', boundary: '만족도만으로 책임성 확보라고 단정하지 않음' })
    })
  }),
  // 0건은 연구 부재가 아니라 이 표본에서 미관찰된 조합을 뜻함.
  gapInterpretation: '이 자료집에서 관찰되지 않은 조합입니다. 분야 전체에 해당 연구가 없다는 뜻이 아닙니다.',
  codingProtocol: [
    '서지정보(DOI/발행연도)와 논문 내용 코딩을 구분한다.',
    '초록만 본 경우 원문 분석으로 확인한 것처럼 표기하지 않는다.',
    '논문 하나당 1개의 주 정책단계와 1개의 주 HCI차원을 기록한다.',
    '여러 차원을 다룬다면 주차원 선택 근거를 notes에 남긴다.',
    '정책 반영은 보고·제안과 실제 수용 근거를 구별한다.',
    '분류가 불명확한 항목은 추정하지 않고 미분류로 남긴다.',
    '정책 반영은 결정문·회의록·후속 공지처럼 제안과 결과를 잇는 기록이 있을 때만 반영 근거 확인으로 한다.',
    'HCI 차원은 화면·기능의 존재가 아니라 참여자 경험 근거(관찰·설문·인터뷰)를 기준으로 고른다.'
  ]
});
