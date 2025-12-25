import { Component, inject, signal, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmAccordionImports } from '@spartan-ng/helm/accordion';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { HlmTooltipImports } from '@spartan-ng/helm/tooltip';
import { provideIcons } from '@ng-icons/core';
import {
  lucideSparkles, lucideAlertCircle, lucideWrench, lucideCheck, lucideCopy, lucideChevronDown,
  lucideImage, lucideFileText, lucideCode, lucideBarChart, lucideVideo, lucideMic, lucideBookOpen, lucideSearch, lucideBot,
  lucideSun, lucideMoon, lucideExternalLink
} from '@ng-icons/lucide';
import { GeminiService, PromptAnalysis } from './services/gemini';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    HlmButtonImports,
    HlmCardImports,
    HlmInputImports,
    HlmLabelImports,
    HlmBadgeImports,
    HlmAccordionImports,
    HlmIconImports,
    HlmTooltipImports,
    LottieComponent
  ],
  providers: [
    provideIcons({
      lucideSparkles, lucideAlertCircle, lucideWrench, lucideCheck, lucideCopy, lucideChevronDown,
      lucideImage, lucideFileText, lucideCode, lucideBarChart, lucideVideo, lucideMic, lucideBookOpen, lucideSearch, lucideBot,
      lucideSun, lucideMoon, lucideExternalLink
    })
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private gemini = inject(GeminiService);

  protected readonly isAppLoading = signal(true);
  protected readonly isMobile = signal(window.innerWidth < 768);
  protected readonly title = signal('PromptForge');
  protected readonly userPrompt = signal('');
  protected readonly analysis = signal<PromptAnalysis | null>(null);
  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly copied = signal(false);
  protected readonly theme = signal<'dark' | 'light'>('dark');

  protected readonly splitPosition = signal(50);
  protected readonly isDragging = signal(false);
  protected activeTooltipTrigger: any = null;

  protected readonly lottieOptions: AnimationOptions = {
    path: '/Sparkles Loop Loader ai.json',
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  @HostListener('window:resize')
  onResize() {
    this.isMobile.set(window.innerWidth < 768);
  }

  ngOnInit() {
    // Simulate initial loading for 2.5 seconds
    setTimeout(() => {
      this.isAppLoading.set(false);
    }, 2500);
  }

  toggleTheme() {
    const newTheme = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  startDrag() {
    this.isDragging.set(true);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }

  stopDrag() {
    this.isDragging.set(false);
    document.body.style.cursor = 'default';
    document.body.style.removeProperty('user-select');
  }

  onDrag(event: MouseEvent) {
    if (!this.isDragging()) return;

    // Calculate percentage based on window width
    // Use the main container width effectively
    const containerWidth = window.innerWidth;
    const newSplit = (event.clientX / containerWidth) * 100;

    // Clamp between 20% and 80%
    if (newSplit > 20 && newSplit < 80) {
      this.splitPosition.set(newSplit);
    }
  }

  onToolClick(event: Event, trigger: any) {
    if (!this.isMobile()) return;
    event.stopPropagation();
    event.preventDefault(); // Prevent ghost clicks or navigation

    if (this.activeTooltipTrigger === trigger) {
      trigger.hide();
      this.activeTooltipTrigger = null;
    } else {
      if (this.activeTooltipTrigger) {
        this.activeTooltipTrigger.hide();
      }
      trigger.show();
      this.activeTooltipTrigger = trigger;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (this.isMobile() && this.activeTooltipTrigger) {
      this.activeTooltipTrigger.hide();
      this.activeTooltipTrigger = null;
    }
  }

  async analyze() {
    if (!this.userPrompt().trim()) return;
    if (!this.gemini.hasApiKey) {
      this.error.set('Gemini API Key is not set in environment.');
      return;
    }

    this.loading.set(true);
    this.error.set(null);
    this.analysis.set(null);

    try {
      const result = await this.gemini.analyzePrompt(this.userPrompt());
      this.analysis.set(result);
    } catch (err: any) {
      this.error.set(err.message || 'An error occurred during analysis.');
    } finally {
      this.loading.set(false);
    }
  }

  copyPrompt() {
    const enhanced = this.analysis()?.enhancedPrompt;
    if (enhanced) {
      navigator.clipboard.writeText(enhanced);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    }
  }

  protected getCategoryIcon(category: string): string {
    const icons: Record<string, string> = {
      image_generation: 'lucideImage',
      text_writing: 'lucideFileText',
      code_generation: 'lucideCode',
      data_analysis: 'lucideBarChart',
      video_generation: 'lucideVideo',
      voice_audio: 'lucideMic',
      study_learning: 'lucideBookOpen',
      search_research: 'lucideSearch',
      automation_agents: 'lucideBot'
    };
    return icons[category] || 'lucideWrench';
  }

  protected getToolLogo(toolName: string): string {
    const name = toolName.toLowerCase();

    // Official or highly reliable SVG links
    if (name.includes('gemini') || name.includes('google')) return 'https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemini_SparkIcon_.width-500.format-webp.webp';
    if (name.includes('openai') || name.includes('chatgpt') || name.includes('dall'))
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/ChatGPT-Logo.svg/1024px-ChatGPT-Logo.svg.png';
    if (name.includes('claude') || name.includes('anthropic')) return 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Claude_AI_symbol.svg/1024px-Claude_AI_symbol.svg.png';
    if (name.includes('midjourney')) return 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/midjourney-color-icon.png';
    if (name.includes('stable diffusion')) return 'https://striking-kindness-e0d93214bb.media.strapiapp.com/Stable_Diffusion_logo_2b68efd6c7.png';
    if (name.includes('copilot') || name.includes('microsoft')) return 'https://gdm-catalog-fmapi-prod.imgix.net/ProductLogo/3cb8e886-e037-4aff-b0ab-c377415089e1.png';
    if (name.includes('runway')) return 'https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/runway.png';
    if (name.includes('perplexity')) return 'https://cdn.simpleicons.org/perplexity';
    if (name.includes('elevenlabs')) return 'https://cdn.simpleicons.org/elevenlabs';
    if (name.includes('pika')) return 'https://pnghdpro.com/wp-content/themes/pnghdpro/download/social-media-and-brands/pika-logo-hd.png';
    if (name.includes('github')) return 'https://cdn-icons-png.flaticon.com/256/25/25231.png';

    // Fallback: high quality UI Avatar with primary color
    return `/aiLOGO.png`;
  }

  protected getToolUrl(toolName: string): string {
    const name = toolName.toLowerCase();
    if (name.includes('gemini') || name.includes('google')) return 'https://gemini.google.com/app';
    if (name.includes('chatgpt') || name.includes('openai')) return 'https://chat.openai.com/';
    if (name.includes('claude') || name.includes('anthropic')) return 'https://claude.ai/chats';
    if (name.includes('midjourney')) return 'https://www.midjourney.com/app/';
    if (name.includes('stable diffusion')) return 'https://stablediffusionweb.com/';
    if (name.includes('copilot') || name.includes('microsoft')) return 'https://copilot.microsoft.com/';
    if (name.includes('runway')) return 'https://runwayml.com/';
    if (name.includes('perplexity')) return 'https://www.perplexity.ai/';
    if (name.includes('elevenlabs')) return 'https://elevenlabs.io/';
    if (name.includes('pika')) return 'https://pika.art/';
    if (name.includes('github')) return 'https://github.com/features/copilot';
    if (name.includes('synthesia')) return 'https://www.synthesia.io/';
    return `https://www.google.com/search?q=${encodeURIComponent(toolName + ' AI tool')}`;
  }

  openTool(toolName: string) {
    // 1. Copy enhanced prompt
    const enhanced = this.analysis()?.enhancedPrompt;
    if (enhanced) {
      navigator.clipboard.writeText(enhanced);
      // Optional: show small toast or feedback? relying on the button action for now
    }

    // 2. Open tool URL
    const url = this.getToolUrl(toolName);
    window.open(url, '_blank');
  }
}
