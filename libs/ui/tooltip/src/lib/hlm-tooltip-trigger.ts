import { Directive, inject } from '@angular/core';
import { BrnTooltipTrigger, provideBrnTooltipDefaultOptions } from '@spartan-ng/brain/tooltip';

export const DEFAULT_TOOLTIP_CONTENT_CLASSES =
	'z-50 w-fit rounded-md text-xs text-balance ' +
	'data-[state=open]:animate-in ' +
	'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 ' +
	'data-[side=below]:slide-in-from-top-2 data-[side=above]:slide-in-from-bottom-2 ' +
	'data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 ';

@Directive({
	selector: '[hlmTooltipTrigger]',
	providers: [
		provideBrnTooltipDefaultOptions({
			showDelay: 150,
			hideDelay: 300,
			exitAnimationDuration: 150,
			tooltipContentClasses: DEFAULT_TOOLTIP_CONTENT_CLASSES,
		}),
	],
	hostDirectives: [
		{
			directive: BrnTooltipTrigger,
			inputs: [
				'brnTooltipDisabled: hlmTooltipDisabled',
				'brnTooltipTrigger: hlmTooltipTrigger',
				'aria-describedby',
				'position',
				'positionAtOrigin',
				'hideDelay',
				'showDelay',
				'exitAnimationDuration',
				'touchGestures',
			],
		},
	],
	host: {
		'data-slot': 'tooltip-trigger',
	},
	exportAs: 'hlmTooltipTrigger',
})
export class HlmTooltipTrigger {
	private readonly _brnTooltipTrigger = inject(BrnTooltipTrigger);

	show() {
		this._brnTooltipTrigger.show();
	}

	hide() {
		this._brnTooltipTrigger.hide();
	}
}
