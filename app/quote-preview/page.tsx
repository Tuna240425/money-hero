"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Eye, Download, Mail } from 'lucide-react';

export default function QuotePreview() {
  const [formData, setFormData] = useState({
    name: '홍길동',
    email: 'test@example.com',
    phone: '010-1234-5678',
    role: '채권자' as '채권자' | '채무자',
    counterparty: '개인' as '개인' | '법인/사업자',
    amount: '1천만~3천만',
    summary: '거래대금 미지급 건으로, 약정일 2024-03-10 이후 지속적인 독촉에도 불구하고 일부 입금 후 잔액을 지급하지 않고 있는 상황입니다.'
  });

  const [previewHTML, setPreviewHTML] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  // 견적 계산 함수 (실제 API와 동일)
  const calculateQuote = (amount: string, counterparty: string, role: string) => {
    const basePrice = {
      "~500만원": 50,
      "500만~1천만": 80,
      "1천만~3천만": 120,
      "3천만~5천만": 200,
      "5천만 이상": 300
    };
    
    const multiplier = counterparty === '법인/사업자' ? 1.3 : 1.0;
    const consultingFee = Math.round((basePrice[amount as keyof typeof basePrice] || 100) * multiplier);
    const successFee = role === '채권자' ? '회수금액의 15-25%' : '협상된 감액의 10-20%';
    
    return { consultingFee, successFee };
  };

  // 견적서 HTML 생성 (간단 버전)
  const generatePreviewHTML = () => {
    const quote = calculateQuote(formData.amount, formData.counterparty, formData.role);
    const quoteNumber = `MH-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    
    return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>머니히어로 채권추심 견적서</title>
    <style>
        body { 
            font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            padding: 20px; 
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); 
        }
        .container { 
            max-width: 700px; 
            margin: 0 auto; 
            background: white; 
            border-radius: 20px; 
            overflow: hidden; 
            box-shadow: 0 20px 40px rgba(0,0,0,0.1); 
        }
        .header { 
            background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%); 
            color: white; 
            padding: 50px 40px; 
            text-align: center; 
            position: relative;
        }
        .quote-number {
            position: absolute;
            top: 20px;
            right: 30px;
            background: rgba(255,255,255,0.2);
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: bold;
        }
        .logo { 
            font-size: 32px; 
            font-weight: 900; 
            margin-bottom: 10px; 
        }
        .header h1 { 
            margin: 0 0 15px 0; 
            font-size: 28px; 
            font-weight: bold; 
        }
        .content { padding: 40px; }
        .section { margin-bottom: 40px; }
        .section h2 { 
            color: #1f2937; 
            font-size: 22px; 
            margin: 0 0 20px 0; 
            padding: 15px 0 15px 20px; 
            background: linear-gradient(90deg, #fbbf24, transparent);
            border-radius: 10px;
        }
        .info-table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 20px 0; 
            background: #f8f9fa; 
            border-radius: 12px; 
            overflow: hidden; 
        }
        .info-table th, .info-table td { 
            padding: 16px 20px; 
            text-align: left; 
            border-bottom: 1px solid #e9ecef; 
        }
        .info-table th { 
            background: linear-gradient(135deg, #f1f3f4, #e2e8f0); 
            font-weight: 600; 
            color: #374151; 
            width: 35%; 
        }
        .quote-table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 25px 0; 
            border-radius: 12px; 
            overflow: hidden;
            box-shadow: 0 8px 16px rgba(251, 191, 36, 0.2);
        }
        .quote-table th { 
            background: linear-gradient(135deg, #fbbf24, #f59e0b); 
            color: white; 
            padding: 20px; 
            font-weight: bold; 
            text-align: center; 
        }
        .quote-table td { 
            padding: 25px 20px; 
            text-align: center; 
            background: #fffbeb; 
            font-size: 20px; 
            font-weight: 700; 
            color: #92400e; 
        }
        .price-highlight { font-size: 24px; color: #dc2626; }
        .highlight-box { 
            background: linear-gradient(135deg, #fef3c7, #fde68a); 
            padding: 30px; 
            border-radius: 15px; 
            margin: 30px 0; 
            border-left: 6px solid #f59e0b; 
        }
        .contact-info { 
            background: linear-gradient(135deg, #1f2937, #111827); 
            color: white; 
            padding: 40px; 
            text-align: center;
        }
        .contact-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        .contact-item { 
            background: rgba(255,255,255,0.1);
            padding: 15px;
            border-radius: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="quote-number">견적서 #${quoteNumber}</div>
            <div class="logo">💰 머니히어로</div>
            <h1>채권추심 견적서</h1>
            <p>전문 변호사와 함께하는 체계적인 채권 회수</p>
        </div>
        
        <div class="content">
            <div class="section">
                <h2>📋 의뢰인 정보</h2>
                <table class="info-table">
                    <tr><th>성함</th><td><strong>${formData.name}</strong></td></tr>
                    <tr><th>구분</th><td>${formData.role}</td></tr>
                    <tr><th>상대방</th><td>${formData.counterparty}</td></tr>
                    <tr><th>채권금액</th><td><span style="color: #dc2626; font-weight: bold;">${formData.amount}</span></td></tr>
                    <tr><th>연락처</th><td>${formData.phone}</td></tr>
                </table>
            </div>
            
            <div class="section">
                <h2>💰 견적 내역</h2>
                <table class="quote-table">
                    <tr>
                        <th>착수금 (상담 + 1차 법적조치)</th>
                        <th>성공수수료</th>
                    </tr>
                    <tr>
                        <td><span class="price-highlight">${quote.consultingFee}만원</span></td>
                        <td><span class="price-highlight">${quote.successFee}</span></td>
                    </tr>
                </table>
            </div>
            
            <div class="highlight-box">
                <h3 style="margin: 0 0 20px 0; color: #92400e;">🎯 포함 서비스</h3>
                <ul style="margin: 0; padding-left: 25px;">
                    <li style="margin-bottom: 12px; color: #78350f;"><strong>무료 사전 상담:</strong> 채권 회수 가능성 및 예상 소요기간 분석</li>
                    <li style="margin-bottom: 12px; color: #78350f;"><strong>1차 법적 조치:</strong> 내용증명 발송 + 지급명령 신청</li>
                    <li style="margin-bottom: 12px; color: #78350f;"><strong>보전 조치:</strong> 필요시 가압류/가처분 신청</li>
                    <li style="margin-bottom: 12px; color: #78350f;"><strong>강제 집행:</strong> 재산조회 및 압류 절차 진행</li>
                    <li style="margin-bottom: 12px; color: #78350f;"><strong>실시간 안내:</strong> 진행상황 카톡/문자 알림 서비스</li>
                    <li style="margin-bottom: 12px; color: #78350f;"><strong>사후 관리:</strong> 미회수시 재산상황 정기 모니터링 제공</li>
                </ul>
            </div>
            
            ${formData.summary ? `
            <div class="section">
                <h2>📝 사건 개요</h2>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 12px; border-left: 4px solid #6b7280;">
                    ${formData.summary.replace(/\n/g, '<br>')}
                </div>
            </div>
            ` : ''}
        </div>
        
        <div class="contact-info">
            <h3>📞 연락처 및 상담</h3>
            <div class="contact-grid">
                <div class="contact-item">
                    <div>대표번호</div>
                    <div style="font-weight: bold; color: #fbbf24;">02-3477-9650</div>
                </div>
                <div class="contact-item">
                    <div>이메일</div>
                    <div style="font-weight: bold; color: #fbbf24;">moneyhero.service@gmail.com</div>
                </div>
                <div class="contact-item">
                    <div>카카오톡</div>
                    <div style="font-weight: bold; color: #fbbf24;">@머니히어로</div>
                </div>
                <div class="contact-item">
                    <div>영업시간</div>
                    <div style="font-weight: bold; color: #fbbf24;">평일 10:00-17:00</div>
                </div>
            </div>
            <p style="margin: 25px 0 10px 0; font-size: 14px; opacity: 0.8;">
                © 2025 머니히어로 | 임앤리 법률사무소. 모든 권리 보유. | 사업자등록번호: 654-39-00409
            </p>
        </div>
    </div>
</body>
</html>
    `;
  };

  const handlePreview = () => {
    const html = generatePreviewHTML();
    setPreviewHTML(html);
    setShowPreview(true);
  };

  const handleDownload = () => {
    const html = generatePreviewHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `견적서_${formData.name}_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-slate-900">
          🎨 견적서 미리보기 & 테스트
        </h1>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* 왼쪽: 폼 */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                견적서 데이터 입력
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>이름</Label>
                  <Input 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label>연락처</Label>
                  <Input 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <Label>이메일</Label>
                <Input 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>의뢰자 유형</Label>
                  <Select value={formData.role} onValueChange={(v: '채권자' | '채무자') => setFormData({...formData, role: v})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="채권자">채권자</SelectItem>
                      <SelectItem value="채무자">채무자</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>상대방 유형</Label>
                  <Select value={formData.counterparty} onValueChange={(v: '개인' | '법인/사업자') => setFormData({...formData, counterparty: v})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="개인">개인</SelectItem>
                      <SelectItem value="법인/사업자">법인/사업자</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label>채권 금액</Label>
                <Select value={formData.amount} onValueChange={(v) => setFormData({...formData, amount: v})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="~500만원">~500만원</SelectItem>
                    <SelectItem value="500만~1천만">500만원~1천만원</SelectItem>
                    <SelectItem value="1천만~3천만">1천만원~3천만원</SelectItem>
                    <SelectItem value="3천만~5천만">3천만원~5천만원</SelectItem>
                    <SelectItem value="5천만 이상">5천만원 이상</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>사건 개요</Label>
                <Textarea 
                  rows={4}
                  value={formData.summary}
                  onChange={(e) => setFormData({...formData, summary: e.target.value})}
                />
              </div>
              
              <div className="flex gap-4">
                <Button onClick={handlePreview} className="flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  미리보기
                </Button>
                <Button onClick={handleDownload} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  다운로드
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* 오른쪽: 미리보기 */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                견적서 미리보기
              </CardTitle>
            </CardHeader>
            <CardContent>
              {showPreview ? (
                <div className="space-y-4">
                  <div className="bg-slate-100 p-4 rounded-lg">
                    <p className="text-sm text-slate-600 mb-2">
                      💡 <strong>미리보기:</strong> 실제 이메일에서 보이는 모습입니다
                    </p>
                    <div className="bg-white border rounded-lg overflow-hidden">
                      <iframe 
                        srcDoc={previewHTML}
                        className="w-full h-96 border-0"
                        title="견적서 미리보기"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button onClick={handleDownload} variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      HTML 다운로드
                    </Button>
                    <Button 
                      onClick={() => {
                        const newWindow = window.open();
                        if (newWindow) {
                          newWindow.document.write(previewHTML);
                          newWindow.document.close();
                        }
                      }} 
                      variant="outline" 
                      className="w-full"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      새 창에서 보기
                    </Button>
                  </div>
                  
                  <div className="text-center">
                    <Button 
                      onClick={() => setShowPreview(false)} 
                      variant="ghost" 
                      size="sm"
                    >
                      미리보기 닫기
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500">
                  <Eye className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">견적서 미리보기</p>
                  <p className="text-sm">
                    왼쪽에서 정보를 입력하고 <br />
                    '미리보기' 버튼을 클릭하세요
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* 하단: 사용법 안내 */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>🔧 사용법 안내</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-semibold mb-2">데이터 입력</h3>
                <p className="text-sm text-slate-600">
                  왼쪽 폼에서 고객 정보와 채권 내용을 입력합니다
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-green-600">2</span>
                </div>
                <h3 className="font-semibold mb-2">미리보기 확인</h3>
                <p className="text-sm text-slate-600">
                  견적서가 어떻게 보이는지 실시간으로 확인합니다
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-yellow-600">3</span>
                </div>
                <h3 className="font-semibold mb-2">템플릿 적용</h3>
                <p className="text-sm text-slate-600">
                  만족스러우면 실제 API 코드에 적용합니다
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}